#!/usr/bin/env bash

set -Eeuo pipefail

readonly EXPECTED_APP_ID="com.spacein"
readonly DEFAULT_UPLOAD_CERT_SHA256="62:02:4B:38:3E:B7:87:B4:BE:9E:75:05:38:B3:92:E6:B4:E0:86:F5:CE:BF:90:E0:C6:E0:F0:09:59:2F:8E:37"
readonly BUNDLETOOL_VERSION="1.18.3"
readonly BUNDLETOOL_SHA256="a099cfa1543f55593bc2ed16a70a7c67fe54b1747bb7301f37fdfd6d91028e29"
readonly BUNDLETOOL_URL="https://github.com/google/bundletool/releases/download/${BUNDLETOOL_VERSION}/bundletool-all-${BUNDLETOOL_VERSION}.jar"
# Google Play 自 2026-08-31 起要求一般手機 App 至少 target Android 16。
# 專案已完成升級，這裡固定為 36，避免日後誤退回 API 35。
readonly MINIMUM_TARGET_SDK=36

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
FRONTEND_DIR="${REPO_ROOT}/frontend"
ANDROID_DIR="${FRONTEND_DIR}/android"
AAB_PATH="${ANDROID_DIR}/app/build/outputs/bundle/release/app-release.aab"
RELEASE_TEMP_DIR=""

log() {
    printf '[Android Release] %s\n' "$*"
}

fail() {
    printf '[Android Release] 錯誤：%s\n' "$*" >&2
    exit 1
}

usage() {
    cat <<'EOF'
用法：
  scripts/android-release.sh build
  scripts/android-release.sh deploy
  scripts/android-release.sh verify-aab <AAB 路徑>

build 必填環境變數：
  ANDROID_VERSION_CODE、ANDROID_VERSION_NAME、KEYSTORE_BASE64、
  KEYSTORE_PASSWORD、KEY_ALIAS、KEY_PASSWORD

選填環境變數：
  EXPECTED_UPLOAD_CERT_SHA256  覆寫既有正式 upload key 的 SHA-256
  SKIP_NPM_CI=1               已安裝相依套件時略過 npm ci
  BUNDLETOOL_CACHE_DIR         指定 bundletool 暫存目錄

deploy 另需 Google Play 服務帳號，並可設定：
  GOOGLE_PLAY_TRACK            預設 internal
  GOOGLE_PLAY_RELEASE_STATUS   預設 completed
  GOOGLE_PLAY_WHATS_NEW_DIR    預設 .github/whatsnew
EOF
}

cleanup() {
    if [[ -n "${RELEASE_TEMP_DIR}" && -d "${RELEASE_TEMP_DIR}" ]]; then
        rm -rf -- "${RELEASE_TEMP_DIR}"
    fi
}

trap cleanup EXIT

require_command() {
    command -v "$1" >/dev/null 2>&1 || fail "找不到必要指令：$1"
}

require_env() {
    local name="$1"
    [[ -n "${!name:-}" ]] || fail "必要環境變數 ${name} 未設定或為空。"
}

normalize_fingerprint() {
    printf '%s' "$1" | tr '[:lower:]' '[:upper:]' | tr -d '[:space:]'
}

decode_base64_to_file() {
    local destination="$1"
    if base64 --help 2>&1 | grep -q -- '--decode'; then
        printf '%s' "${KEYSTORE_BASE64}" | base64 --decode > "${destination}"
    else
        printf '%s' "${KEYSTORE_BASE64}" | base64 -D > "${destination}"
    fi
}

sha256_file() {
    shasum -a 256 "$1" | awk '{print $1}'
}

ensure_bundletool() {
    local cache_root="${BUNDLETOOL_CACHE_DIR:-${RUNNER_TEMP:-${TMPDIR:-/tmp}}/spacein-bundletool}"
    local jar_path="${cache_root}/bundletool-all-${BUNDLETOOL_VERSION}.jar"
    mkdir -p "${cache_root}"

    if [[ -f "${jar_path}" ]] && [[ "$(sha256_file "${jar_path}")" != "${BUNDLETOOL_SHA256}" ]]; then
        log "bundletool checksum 不符，重新下載固定版本。" >&2
        rm -f -- "${jar_path}"
    fi

    if [[ ! -f "${jar_path}" ]]; then
        require_command curl
        log "下載 bundletool ${BUNDLETOOL_VERSION}。" >&2
        curl --fail --location --retry 3 --silent --show-error \
            --output "${jar_path}" "${BUNDLETOOL_URL}"
    fi

    [[ "$(sha256_file "${jar_path}")" == "${BUNDLETOOL_SHA256}" ]] ||
        fail "bundletool SHA-256 驗證失敗。"
    printf '%s\n' "${jar_path}"
}

certificate_sha256_from_aab() {
    local aab_path="$1"
    keytool -printcert -jarfile "${aab_path}" |
        awk -F'SHA256:' '/SHA256:/{gsub(/[[:space:]]/, "", $2); print toupper($2); exit}'
}

certificate_sha256_from_keystore() {
    local keystore_path="$1"
    keytool -list -v \
        -keystore "${keystore_path}" \
        -storepass:env KEYSTORE_PASSWORD \
        -alias "${KEY_ALIAS}" |
        awk -F'SHA256:' '/SHA256:/{gsub(/[[:space:]]/, "", $2); print toupper($2); exit}'
}

assert_upload_certificate() {
    local actual_fingerprint
    local expected_fingerprint
    actual_fingerprint="$(normalize_fingerprint "$1")"
    expected_fingerprint="$(normalize_fingerprint "${EXPECTED_UPLOAD_CERT_SHA256:-${DEFAULT_UPLOAD_CERT_SHA256}}")"

    [[ -n "${actual_fingerprint}" ]] || fail "無法讀取簽章憑證 SHA-256。"
    [[ "${actual_fingerprint}" == "${expected_fingerprint}" ]] ||
        fail "簽章憑證不符。預期 ${expected_fingerprint}，實際 ${actual_fingerprint}。"
}

assert_source_app_id() {
    grep -Fq "appId: '${EXPECTED_APP_ID}'" "${FRONTEND_DIR}/capacitor.config.ts" ||
        fail "capacitor.config.ts 的 appId 不是 ${EXPECTED_APP_ID}。"
    grep -Fq "applicationId \"${EXPECTED_APP_ID}\"" "${ANDROID_DIR}/app/build.gradle" ||
        fail "Android applicationId 不是 ${EXPECTED_APP_ID}。"
}

verify_aab() {
    local aab_path="$1"
    local bundletool_path
    local manifest
    local actual_package
    local actual_version_code
    local actual_version_name
    local actual_target_sdk
    local minimum_target_sdk
    local actual_cert

    [[ -s "${aab_path}" ]] || fail "AAB 不存在或為空：${aab_path}"
    require_command java
    require_command jarsigner
    require_command keytool
    bundletool_path="$(ensure_bundletool)"

    jarsigner -verify "${aab_path}" >/dev/null ||
        fail "AAB JAR 簽章驗證失敗。"
    manifest="$(java -jar "${bundletool_path}" dump manifest \
        --bundle="${aab_path}" --module=base)"

    actual_package="$(printf '%s\n' "${manifest}" |
        sed -n 's/.* package="\([^"]*\)".*/\1/p' | head -1)"
    actual_version_code="$(printf '%s\n' "${manifest}" |
        sed -n 's/.*android:versionCode="\([^"]*\)".*/\1/p' | head -1)"
    actual_version_name="$(printf '%s\n' "${manifest}" |
        sed -n 's/.*android:versionName="\([^"]*\)".*/\1/p' | head -1)"
    actual_target_sdk="$(printf '%s\n' "${manifest}" |
        sed -n 's/.*android:targetSdkVersion="\([^"]*\)".*/\1/p' | head -1)"
    actual_cert="$(certificate_sha256_from_aab "${aab_path}")"
    minimum_target_sdk="${MINIMUM_TARGET_SDK}"

    [[ "${actual_package}" == "${EXPECTED_APP_ID}" ]] ||
        fail "AAB package 為 ${actual_package:-未知}，預期 ${EXPECTED_APP_ID}。"
    [[ "${actual_target_sdk}" =~ ^[0-9]+$ ]] ||
        fail "無法從 AAB manifest 讀取 targetSdkVersion。"
    (( actual_target_sdk >= minimum_target_sdk )) ||
        fail "AAB targetSdkVersion=${actual_target_sdk}，Google Play 目前至少要求 API ${minimum_target_sdk}。"
    if [[ -n "${ANDROID_VERSION_CODE:-}" ]]; then
        [[ "${actual_version_code}" == "${ANDROID_VERSION_CODE}" ]] ||
            fail "AAB versionCode 為 ${actual_version_code:-未知}，預期 ${ANDROID_VERSION_CODE}。"
    fi
    if [[ -n "${ANDROID_VERSION_NAME:-}" ]]; then
        [[ "${actual_version_name}" == "${ANDROID_VERSION_NAME}" ]] ||
            fail "AAB versionName 為 ${actual_version_name:-未知}，預期 ${ANDROID_VERSION_NAME}。"
    fi
    assert_upload_certificate "${actual_cert}"

    log "AAB 驗證成功：package=${actual_package}、versionCode=${actual_version_code}、versionName=${actual_version_name}、targetSdk=${actual_target_sdk}。"
    log "Upload key SHA-256：${actual_cert}"

    if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
        {
            printf 'aab_path=%s\n' "${aab_path}"
            printf 'version_code=%s\n' "${actual_version_code}"
            printf 'version_name=%s\n' "${actual_version_name}"
            printf 'target_sdk=%s\n' "${actual_target_sdk}"
            printf 'upload_cert_sha256=%s\n' "${actual_cert}"
        } >> "${GITHUB_OUTPUT}"
    fi
}

build_release() {
    local decoded_keystore
    local keystore_cert

    require_command base64
    require_command keytool
    require_command node
    require_command npm
    require_command shasum
    require_env ANDROID_VERSION_CODE
    require_env ANDROID_VERSION_NAME
    require_env KEYSTORE_BASE64
    require_env KEYSTORE_PASSWORD
    require_env KEY_ALIAS
    require_env KEY_PASSWORD
    [[ "${ANDROID_VERSION_CODE}" =~ ^[1-9][0-9]*$ ]] ||
        fail "ANDROID_VERSION_CODE 必須是正整數。"
    (( ANDROID_VERSION_CODE <= 2100000000 )) ||
        fail "ANDROID_VERSION_CODE 不得超過 Google Play 上限 2100000000。"
    assert_source_app_id

    umask 077
    RELEASE_TEMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/spacein-android-release.XXXXXX")"
    decoded_keystore="${RELEASE_TEMP_DIR}/upload-key.jks"
    decode_base64_to_file "${decoded_keystore}"
    [[ -s "${decoded_keystore}" ]] || fail "KEYSTORE_BASE64 解碼後為空檔案。"

    keystore_cert="$(certificate_sha256_from_keystore "${decoded_keystore}")"
    assert_upload_certificate "${keystore_cert}"
    log "Upload key alias 與 SHA-256 驗證成功。"

    if [[ "${SKIP_NPM_CI:-0}" != "1" ]]; then
        log "安裝鎖定版前端相依套件。"
        (cd "${FRONTEND_DIR}" && npm ci)
    fi

    log "建置 Angular production 並同步 Capacitor Android。"
    (cd "${FRONTEND_DIR}" && npm run build:prod && npx cap sync android)

    log "建置已簽章 release AAB。"
    (
        cd "${ANDROID_DIR}"
        export ANDROID_KEYSTORE_FILE="${decoded_keystore}"
        export KEYSTORE_PASSWORD KEY_ALIAS KEY_PASSWORD
        export ANDROID_VERSION_CODE ANDROID_VERSION_NAME
        bash ./gradlew bundleRelease --no-daemon
    )

    verify_aab "${AAB_PATH}"
}

deploy_release() {
    local track="${GOOGLE_PLAY_TRACK:-internal}"
    local release_status="${GOOGLE_PLAY_RELEASE_STATUS:-completed}"
    local whats_new_directory="${GOOGLE_PLAY_WHATS_NEW_DIR:-${REPO_ROOT}/.github/whatsnew}"
    local release_name

    require_command node
    log "查詢 Google Play 現有 APK/AAB，取得下一個可用 versionCode。"
    ANDROID_VERSION_CODE="$(
        node "${SCRIPT_DIR}/google-play-api.mjs" next-version
    )"
    ANDROID_VERSION_NAME="$(
        printf '%s' "${ANDROID_VERSION_NAME:-$(
            node -p "require('${FRONTEND_DIR}/package.json').version"
        )}"
    )"
    export ANDROID_VERSION_CODE ANDROID_VERSION_NAME
    release_name="${ANDROID_VERSION_NAME} (${ANDROID_VERSION_CODE})"
    log "準備部署 ${EXPECTED_APP_ID} ${release_name} 至 ${track}。"

    build_release

    node "${SCRIPT_DIR}/google-play-api.mjs" deploy \
        --aab "${AAB_PATH}" \
        --track "${track}" \
        --status "${release_status}" \
        --expected-version-code "${ANDROID_VERSION_CODE}" \
        --release-name "${release_name}" \
        --whats-new-dir "${whats_new_directory}"

    node "${SCRIPT_DIR}/google-play-api.mjs" verify \
        --track "${track}" \
        --version-code "${ANDROID_VERSION_CODE}" \
        --status "${release_status}"
    log "Google Play 部署與軌道查核全部成功。"
}

main() {
    local command="${1:-}"
    case "${command}" in
        build)
            [[ "$#" -eq 1 ]] || fail "build 不接受額外參數。"
            build_release
            ;;
        deploy)
            [[ "$#" -eq 1 ]] || fail "deploy 不接受額外參數。"
            deploy_release
            ;;
        verify-aab)
            [[ "$#" -eq 2 ]] || fail "verify-aab 必須指定一個 AAB 路徑。"
            verify_aab "$2"
            ;;
        -h|--help|help)
            usage
            ;;
        *)
            usage >&2
            exit 2
            ;;
    esac
}

main "$@"
