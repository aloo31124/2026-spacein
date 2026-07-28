#!/usr/bin/env bash

set -Eeuo pipefail

readonly EXPECTED_APP_ID="com.spacein"
readonly DEFAULT_TEAM_ID="ZFR9YGJB4N"
readonly SCHEME="space-in"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
FRONTEND_DIR="${REPO_ROOT}/frontend"
IOS_DIR="${FRONTEND_DIR}/ios/App"
PROJECT_FILE="${IOS_DIR}/App.xcodeproj/project.pbxproj"
WORKSPACE="${IOS_DIR}/App.xcworkspace"
API_HELPER="${SCRIPT_DIR}/app-store-connect-api.rb"
OUTPUT_DIR="${IOS_RELEASE_OUTPUT_DIR:-${REPO_ROOT}/.artifacts/ios-release}"
TEAM_ID="${IOS_TEAM_ID:-${DEFAULT_TEAM_ID}}"
RELEASE_TEMP_DIR=""
RELEASE_VERSION=""
RELEASE_BUILD=""
ARCHIVE_PATH=""
IPA_PATH=""
REVIEW_WHATS_NEW=""
REVIEW_LOCALE=""
REVIEW_RELEASE_TYPE=""

log() {
    printf '[iOS Release] %s\n' "$*"
}

fail() {
    printf '[iOS Release] 錯誤：%s\n' "$*" >&2
    exit 1
}

usage() {
    cat <<'EOF'
用法：
  scripts/ios-release.sh build
  scripts/ios-release.sh deploy
  scripts/ios-release.sh release
  scripts/ios-release.sh submit-review
  scripts/ios-release.sh verify-review
  scripts/ios-release.sh verify-archive <xcarchive 路徑>
  scripts/ios-release.sh verify-ipa <ipa 路徑>

deploy、release、submit-review、verify-review 需設定：
  ASC_KEY_ID       App Store Connect API Key ID
  ASC_ISSUER_ID    App Store Connect Issuer ID
  ASC_KEY_PATH     AuthKey_*.p8 的絕對或相對路徑

選填環境變數：
  IOS_VERSION                  指定 marketing version；未設定時自動增加最後一碼
  IOS_BUILD_NUMBER             指定正整數 build number；未設定時由 API 取得
  IOS_TEAM_ID                  預設 ZFR9YGJB4N
  IOS_RELEASE_OUTPUT_DIR       預設 .artifacts/ios-release
  SKIP_NPM_CI=1                已安裝相依套件時略過 npm ci
  SKIP_POD_INSTALL=1           Pods 已同步時略過 pod install
  IOS_VERIFY_TIMEOUT_SECONDS   等待 Apple 處理完成秒數，預設 1800
  IOS_VERIFY_POLL_SECONDS      查核間隔秒數，預設 30
  IOS_LOCALE                   App Store 版本說明語系，預設 zh-Hant
  IOS_WHATS_NEW                本版更新說明；優先於 IOS_WHATS_NEW_FILE
  IOS_WHATS_NEW_FILE           預設 .github/whatsnew/ios-zh-Hant.txt
  IOS_RELEASE_TYPE             MANUAL、AFTER_APPROVAL 或 SCHEDULED；
                               預設 AFTER_APPROVAL
  IOS_EARLIEST_RELEASE_DATE    SCHEDULED 必填的 ISO 8601 日期時間
  IOS_REVIEW_TIMEOUT_SECONDS   等待進入審查佇列秒數，預設 900
  IOS_REVIEW_POLL_SECONDS      審查狀態查核間隔秒數，預設 15
  IOS_XCODE_ACCOUNT_UPLOAD=1   無 API Key 時使用本機 Xcode 帳號上傳；
                               只確認 Apple 接受傳輸，無法自動建立版本或輪詢處理結果

命令差異：
  deploy          建置、上傳並驗證 TestFlight build 為 VALID
  release         執行 deploy 後，綁定 build、更新版本說明並送出 App Review
  submit-review   將 Xcode 專案目前的 version/build 送出 App Review，不重建 IPA
  verify-review   驗證目前 version 已進入 App Review 佇列
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

has_api_auth() {
    [[ -n "${ASC_KEY_ID:-}" && -n "${ASC_ISSUER_ID:-}" && -n "${ASC_KEY_PATH:-}" ]]
}

assert_no_partial_api_auth() {
    local configured=0
    [[ -n "${ASC_KEY_ID:-}" ]] && configured=$((configured + 1))
    [[ -n "${ASC_ISSUER_ID:-}" ]] && configured=$((configured + 1))
    [[ -n "${ASC_KEY_PATH:-}" ]] && configured=$((configured + 1))
    [[ "${configured}" -eq 0 || "${configured}" -eq 3 ]] ||
        fail "ASC_KEY_ID、ASC_ISSUER_ID、ASC_KEY_PATH 必須全部設定或全部不設定。"
}

assert_project_identity() {
    grep -Fq "appId: '${EXPECTED_APP_ID}'" "${FRONTEND_DIR}/capacitor.config.ts" ||
        fail "capacitor.config.ts 的 appId 不是 ${EXPECTED_APP_ID}。"

    local bundle_count
    local team_count
    bundle_count="$(grep -Ec "PRODUCT_BUNDLE_IDENTIFIER = ${EXPECTED_APP_ID};" "${PROJECT_FILE}")"
    team_count="$(grep -Ec "DEVELOPMENT_TEAM = ${TEAM_ID};" "${PROJECT_FILE}")"
    [[ "${bundle_count}" -eq 2 ]] ||
        fail "Xcode Debug/Release bundle ID 未同時固定為 ${EXPECTED_APP_ID}。"
    [[ "${team_count}" -ge 2 ]] ||
        fail "Xcode target Team 不是 ${TEAM_ID}。"
    [[ "$(/usr/libexec/PlistBuddy -c 'Print :ITSAppUsesNonExemptEncryption' "${IOS_DIR}/App/Info.plist" 2>/dev/null)" == "false" ]] ||
        fail "Info.plist 必須宣告 ITSAppUsesNonExemptEncryption=false，避免上傳後卡在出口合規資訊。"

    xcodebuild -workspace "${WORKSPACE}" -scheme "${SCHEME}" -configuration Release -showBuildSettings |
        grep -Fq "PRODUCT_BUNDLE_IDENTIFIER = ${EXPECTED_APP_ID}" ||
        fail "共享 scheme ${SCHEME} 未解析到 ${EXPECTED_APP_ID} App target。"
}

current_marketing_version() {
    xcodebuild -workspace "${WORKSPACE}" -scheme "${SCHEME}" -configuration Release -showBuildSettings |
        awk -F' = ' '/^[[:space:]]*MARKETING_VERSION = / { print $2; exit }'
}

current_build_number() {
    xcodebuild -workspace "${WORKSPACE}" -scheme "${SCHEME}" -configuration Release -showBuildSettings |
        awk -F' = ' '/^[[:space:]]*CURRENT_PROJECT_VERSION = / { print $2; exit }'
}

local_next_version() {
    local current="$1"
    ruby -e '
      current, archive_root, expected_id = ARGV
      versions = [current]
      Dir.glob(File.join(archive_root, "**", "*.xcarchive", "Info.plist")).each do |plist|
        identifier = IO.popen(
          ["/usr/libexec/PlistBuddy", "-c", "Print :ApplicationProperties:CFBundleIdentifier", plist],
          err: File::NULL,
          &:read
        ).strip
        next unless identifier == expected_id
        version = IO.popen(
          ["/usr/libexec/PlistBuddy", "-c", "Print :ApplicationProperties:CFBundleShortVersionString", plist],
          err: File::NULL,
          &:read
        ).strip
        versions << version if version.match?(/\A\d+(?:\.\d+)*\z/)
      end
      highest = versions.max_by { |value| value.split(".").map(&:to_i) }
      parts = highest.split(".")
      parts[-1] = (parts[-1].to_i + 1).to_s
      puts parts.join(".")
    ' "${current}" "${HOME}/Library/Developer/Xcode/Archives" "${EXPECTED_APP_ID}"
}

resolve_release_numbers() {
    local current_version
    current_version="$(current_marketing_version)"
    [[ "${current_version}" =~ ^[0-9]+([.][0-9]+)*$ ]] ||
        fail "無法讀取合法的目前版本：${current_version:-空白}。"

    if [[ -n "${IOS_VERSION:-}" ]]; then
        RELEASE_VERSION="${IOS_VERSION}"
    elif has_api_auth; then
        RELEASE_VERSION="$(
            ruby "${API_HELPER}" next-version \
                --bundle-id "${EXPECTED_APP_ID}" \
                --minimum "${current_version}"
        )"
    else
        RELEASE_VERSION="$(local_next_version "${current_version}")"
    fi
    [[ "${RELEASE_VERSION}" =~ ^[0-9]+([.][0-9]+){1,2}$ ]] ||
        fail "iOS version 必須包含 2 或 3 段數字：${RELEASE_VERSION}。"

    if [[ -n "${IOS_BUILD_NUMBER:-}" ]]; then
        RELEASE_BUILD="${IOS_BUILD_NUMBER}"
    elif has_api_auth; then
        RELEASE_BUILD="$(
            ruby "${API_HELPER}" next-build \
                --bundle-id "${EXPECTED_APP_ID}" \
                --version "${RELEASE_VERSION}"
        )"
    else
        RELEASE_BUILD="1"
    fi
    [[ "${RELEASE_BUILD}" =~ ^[1-9][0-9]*$ ]] ||
        fail "iOS build number 必須是正整數：${RELEASE_BUILD}。"
}

resolve_existing_release_numbers() {
    RELEASE_VERSION="${IOS_VERSION:-$(current_marketing_version)}"
    RELEASE_BUILD="${IOS_BUILD_NUMBER:-$(current_build_number)}"
    [[ "${RELEASE_VERSION}" =~ ^[0-9]+([.][0-9]+){1,2}$ ]] ||
        fail "iOS version 必須包含 2 或 3 段數字：${RELEASE_VERSION}。"
    [[ "${RELEASE_BUILD}" =~ ^[1-9][0-9]*$ ]] ||
        fail "iOS build number 必須是正整數：${RELEASE_BUILD}。"
}

resolve_review_metadata() {
    local whats_new_file="${IOS_WHATS_NEW_FILE:-${REPO_ROOT}/.github/whatsnew/ios-zh-Hant.txt}"

    REVIEW_LOCALE="${IOS_LOCALE:-zh-Hant}"
    REVIEW_RELEASE_TYPE="${IOS_RELEASE_TYPE:-AFTER_APPROVAL}"
    case "${REVIEW_RELEASE_TYPE}" in
        MANUAL|AFTER_APPROVAL)
            [[ -z "${IOS_EARLIEST_RELEASE_DATE:-}" ]] ||
                fail "只有 IOS_RELEASE_TYPE=SCHEDULED 可設定 IOS_EARLIEST_RELEASE_DATE。"
            ;;
        SCHEDULED)
            [[ -n "${IOS_EARLIEST_RELEASE_DATE:-}" ]] ||
                fail "IOS_RELEASE_TYPE=SCHEDULED 時必須設定 IOS_EARLIEST_RELEASE_DATE。"
            ;;
        *)
            fail "IOS_RELEASE_TYPE 必須是 MANUAL、AFTER_APPROVAL 或 SCHEDULED。"
            ;;
    esac

    if [[ -n "${IOS_WHATS_NEW:-}" ]]; then
        REVIEW_WHATS_NEW="${IOS_WHATS_NEW}"
    else
        [[ -s "${whats_new_file}" ]] ||
            fail "找不到非空白的版本更新說明：${whats_new_file}"
        REVIEW_WHATS_NEW="$(<"${whats_new_file}")"
    fi
    [[ -n "${REVIEW_WHATS_NEW//[[:space:]]/}" ]] ||
        fail "版本更新說明不得為空白。"
}

set_project_versions() {
    ruby -e '
      path, version, build = ARGV
      content = File.read(path)
      marketing_count = content.scan(/MARKETING_VERSION = [^;]+;/).length
      build_count = content.scan(/CURRENT_PROJECT_VERSION = [^;]+;/).length
      abort "預期各找到 2 個版本設定，實際 MARKETING_VERSION=#{marketing_count}、CURRENT_PROJECT_VERSION=#{build_count}" unless
        marketing_count == 2 && build_count == 2
      content.gsub!(/MARKETING_VERSION = [^;]+;/, "MARKETING_VERSION = #{version};")
      content.gsub!(/CURRENT_PROJECT_VERSION = [^;]+;/, "CURRENT_PROJECT_VERSION = #{build};")
      File.write(path, content)
    ' "${PROJECT_FILE}" "${RELEASE_VERSION}" "${RELEASE_BUILD}" ||
        fail "更新 Xcode 版本設定失敗。"
}

xcode_auth_arguments() {
    if has_api_auth; then
        printf '%s\0' \
            -authenticationKeyPath "$(cd "$(dirname "${ASC_KEY_PATH}")" && pwd)/$(basename "${ASC_KEY_PATH}")" \
            -authenticationKeyID "${ASC_KEY_ID}" \
            -authenticationKeyIssuerID "${ASC_ISSUER_ID}"
    fi
}

prepare_frontend_and_pods() {
    if [[ "${SKIP_NPM_CI:-0}" != "1" ]]; then
        log "安裝鎖定版前端相依套件。"
        (cd "${FRONTEND_DIR}" && npm ci)
    fi

    log "建置 Angular production 並同步 Capacitor iOS。"
    (cd "${FRONTEND_DIR}" && npm run build:prod && npx cap sync ios)

    if [[ "${SKIP_POD_INSTALL:-0}" != "1" ]]; then
        log "同步 CocoaPods 鎖定相依套件。"
        (cd "${IOS_DIR}" && pod install --deployment)
    fi
}

write_export_options() {
    local destination="$1"
    local path="$2"
    cat > "${path}" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>destination</key>
    <string>${destination}</string>
    <key>manageAppVersionAndBuildNumber</key>
    <false/>
    <key>method</key>
    <string>app-store-connect</string>
    <key>signingStyle</key>
    <string>automatic</string>
    <key>stripSwiftSymbols</key>
    <true/>
    <key>teamID</key>
    <string>${TEAM_ID}</string>
    <key>uploadSymbols</key>
    <true/>
</dict>
</plist>
EOF
}

profile_value() {
    local profile_plist="$1"
    local key="$2"
    /usr/libexec/PlistBuddy -c "Print :${key}" "${profile_plist}" 2>/dev/null || true
}

verify_app_bundle() {
    local app_path="$1"
    local expected_version="$2"
    local expected_build="$3"
    local profile_path="${app_path}/embedded.mobileprovision"
    local profile_plist="${RELEASE_TEMP_DIR}/profile-$RANDOM.plist"
    local actual_id
    local actual_version
    local actual_build
    local profile_team
    local application_identifier
    local profile_expiration

    actual_id="$(profile_value "${app_path}/Info.plist" CFBundleIdentifier)"
    actual_version="$(profile_value "${app_path}/Info.plist" CFBundleShortVersionString)"
    actual_build="$(profile_value "${app_path}/Info.plist" CFBundleVersion)"
    [[ "${actual_id}" == "${EXPECTED_APP_ID}" ]] ||
        fail "產物 bundle ID 為 ${actual_id:-未知}，預期 ${EXPECTED_APP_ID}。"
    [[ "${actual_version}" == "${expected_version}" ]] ||
        fail "產物 version 為 ${actual_version:-未知}，預期 ${expected_version}。"
    [[ "${actual_build}" == "${expected_build}" ]] ||
        fail "產物 build 為 ${actual_build:-未知}，預期 ${expected_build}。"

    codesign --verify --deep --strict "${app_path}" ||
        fail "App code signature 驗證失敗。"
    [[ -f "${profile_path}" ]] ||
        fail "App 缺少 embedded.mobileprovision。"
    security cms -D -i "${profile_path}" > "${profile_plist}" ||
        fail "無法解析 embedded.mobileprovision。"

    profile_team="$(profile_value "${profile_plist}" TeamIdentifier:0)"
    application_identifier="$(profile_value "${profile_plist}" Entitlements:application-identifier)"
    profile_expiration="$(profile_value "${profile_plist}" ExpirationDate)"
    [[ "${profile_team}" == "${TEAM_ID}" ]] ||
        fail "Provisioning profile Team 為 ${profile_team:-未知}，預期 ${TEAM_ID}。"
    [[ "${application_identifier}" == "${TEAM_ID}.${EXPECTED_APP_ID}" ]] ||
        fail "Provisioning profile App ID 為 ${application_identifier:-未知}。"
    [[ -n "${profile_expiration}" ]] ||
        fail "Provisioning profile 沒有有效期限。"
    ruby -rtime -e 'exit(Time.parse(ARGV[0]) > Time.now ? 0 : 1)' "${profile_expiration}" ||
        fail "Provisioning profile 已過期：${profile_expiration}。"

    log "產物驗證成功：${actual_id} ${actual_version} (${actual_build})、Team ${profile_team}。"
}

verify_archive() {
    local archive_path="$1"
    local archive_info="${archive_path}/Info.plist"
    local app_path="${archive_path}/Products/Applications/App.app"
    local expected_version="${RELEASE_VERSION:-$(profile_value "${archive_info}" ApplicationProperties:CFBundleShortVersionString)}"
    local expected_build="${RELEASE_BUILD:-$(profile_value "${archive_info}" ApplicationProperties:CFBundleVersion)}"

    [[ -d "${archive_path}" ]] || fail "xcarchive 不存在：${archive_path}"
    [[ -d "${app_path}" ]] || fail "xcarchive 缺少 App.app：${archive_path}"
    verify_app_bundle "${app_path}" "${expected_version}" "${expected_build}"
}

verify_ipa() {
    local ipa_path="$1"
    local unpack_dir
    local app_path
    local expected_version="${RELEASE_VERSION}"
    local expected_build="${RELEASE_BUILD}"

    [[ -s "${ipa_path}" ]] || fail "IPA 不存在或為空：${ipa_path}"
    unpack_dir="$(mktemp -d "${RELEASE_TEMP_DIR}/ipa.XXXXXX")"
    unzip -q "${ipa_path}" -d "${unpack_dir}"
    app_path="$(find "${unpack_dir}/Payload" -maxdepth 1 -type d -name '*.app' -print -quit)"
    [[ -n "${app_path}" ]] || fail "IPA Payload 內找不到 .app。"
    if [[ -z "${expected_version}" ]]; then
        expected_version="$(profile_value "${app_path}/Info.plist" CFBundleShortVersionString)"
    fi
    if [[ -z "${expected_build}" ]]; then
        expected_build="$(profile_value "${app_path}/Info.plist" CFBundleVersion)"
    fi
    verify_app_bundle "${app_path}" "${expected_version}" "${expected_build}"
}

build_release() {
    local export_plist
    local -a xcode_extra_args=(-allowProvisioningUpdates)
    local ipa_count
    local export_dir

    assert_no_partial_api_auth
    assert_project_identity
    resolve_release_numbers
    set_project_versions
    assert_project_identity

    mkdir -p "${OUTPUT_DIR}"
    ARCHIVE_PATH="${OUTPUT_DIR}/com.spacein-${RELEASE_VERSION}-${RELEASE_BUILD}.xcarchive"
    export_dir="${OUTPUT_DIR}/com.spacein-${RELEASE_VERSION}-${RELEASE_BUILD}"
    rm -rf -- "${ARCHIVE_PATH}" "${export_dir}"
    mkdir -p "${export_dir}"

    if has_api_auth; then
        while IFS= read -r -d '' argument; do
            xcode_extra_args+=("${argument}")
        done < <(xcode_auth_arguments)
    fi

    prepare_frontend_and_pods

    log "封存 ${EXPECTED_APP_ID} ${RELEASE_VERSION} (${RELEASE_BUILD})。"
    xcodebuild \
        -workspace "${WORKSPACE}" \
        -scheme "${SCHEME}" \
        -configuration Release \
        -destination "generic/platform=iOS" \
        -archivePath "${ARCHIVE_PATH}" \
        "${xcode_extra_args[@]}" \
        archive
    verify_archive "${ARCHIVE_PATH}"

    export_plist="${RELEASE_TEMP_DIR}/ExportOptions.plist"
    write_export_options export "${export_plist}"
    log "匯出 App Store Connect distribution IPA。"
    xcodebuild \
        -exportArchive \
        -archivePath "${ARCHIVE_PATH}" \
        -exportPath "${export_dir}" \
        -exportOptionsPlist "${export_plist}" \
        "${xcode_extra_args[@]}"

    ipa_count="$(find "${export_dir}" -maxdepth 1 -type f -name '*.ipa' | wc -l | tr -d ' ')"
    [[ "${ipa_count}" -eq 1 ]] ||
        fail "預期匯出 1 個 IPA，實際 ${ipa_count} 個。"
    IPA_PATH="$(find "${export_dir}" -maxdepth 1 -type f -name '*.ipa' -print -quit)"
    verify_ipa "${IPA_PATH}"

    log "Release 建置完成：${IPA_PATH}"
}

deploy_with_api() {
    local app_store_version_id
    local app_id
    local verify_timeout="${IOS_VERIFY_TIMEOUT_SECONDS:-1800}"
    local verify_poll="${IOS_VERIFY_POLL_SECONDS:-30}"

    app_id="$(ruby "${API_HELPER}" app-id --bundle-id "${EXPECTED_APP_ID}")"
    [[ -n "${app_id}" ]] || fail "無法取得 ${EXPECTED_APP_ID} 的 Apple ID。"
    app_store_version_id="$(
        ruby "${API_HELPER}" ensure-version \
            --bundle-id "${EXPECTED_APP_ID}" \
            --version "${RELEASE_VERSION}"
    )"
    log "App Store Connect 版本 ${RELEASE_VERSION} 已存在或建立完成（${app_store_version_id}）。"

    log "先驗證 IPA 是否符合 App Store Connect 要求。"
    xcrun altool --validate-app -f "${IPA_PATH}" \
        --api-key "${ASC_KEY_ID}" \
        --api-issuer "${ASC_ISSUER_ID}" \
        --p8-file-path "${ASC_KEY_PATH}" \
        --output-format json

    log "上傳 IPA 至 App Store Connect。"
    xcrun altool --upload-app -f "${IPA_PATH}" \
        --api-key "${ASC_KEY_ID}" \
        --api-issuer "${ASC_ISSUER_ID}" \
        --p8-file-path "${ASC_KEY_PATH}" \
        --show-progress \
        --output-format json

    log "等待 Apple 完成 build 處理與驗證。"
    ruby "${API_HELPER}" verify-build \
        --bundle-id "${EXPECTED_APP_ID}" \
        --version "${RELEASE_VERSION}" \
        --build "${RELEASE_BUILD}" \
        --timeout "${verify_timeout}" \
        --poll "${verify_poll}" |
        grep -Fxq "VALID" ||
        fail "App Store Connect 未回報 VALID。"

    log "部署驗證成功：${EXPECTED_APP_ID} ${RELEASE_VERSION} (${RELEASE_BUILD}) 已為 VALID。"
}

deploy_with_xcode_account() {
    local upload_plist="${RELEASE_TEMP_DIR}/UploadOptions.plist"
    write_export_options upload "${upload_plist}"
    log "使用本機 Xcode Apple 帳號上傳 archive。"
    xcodebuild \
        -exportArchive \
        -archivePath "${ARCHIVE_PATH}" \
        -exportPath "${RELEASE_TEMP_DIR}/upload" \
        -exportOptionsPlist "${upload_plist}" \
        -allowProvisioningUpdates
    log "Apple 已接受上傳；此模式仍須在 App Store Connect 核對 Processing 最終轉為 Complete。"
}

submit_review_with_api() {
    local review_timeout="${IOS_REVIEW_TIMEOUT_SECONDS:-900}"
    local review_poll="${IOS_REVIEW_POLL_SECONDS:-15}"
    local state
    local -a review_arguments=(
        submit-review
        --bundle-id "${EXPECTED_APP_ID}"
        --version "${RELEASE_VERSION}"
        --build "${RELEASE_BUILD}"
        --locale "${REVIEW_LOCALE}"
        --whats-new "${REVIEW_WHATS_NEW}"
        --release-type "${REVIEW_RELEASE_TYPE}"
        --timeout "${review_timeout}"
        --poll "${review_poll}"
    )

    if [[ "${REVIEW_RELEASE_TYPE}" == "SCHEDULED" ]]; then
        review_arguments+=(--earliest-release-date "${IOS_EARLIEST_RELEASE_DATE}")
    fi

    log "綁定 build、更新 App Store 版本資料並送出 App Review。"
    state="$(ruby "${API_HELPER}" "${review_arguments[@]}")"
    case "${state}" in
        WAITING_FOR_REVIEW|IN_REVIEW|ACCEPTED|PENDING_DEVELOPER_RELEASE|PENDING_APPLE_RELEASE|PROCESSING_FOR_APP_STORE|READY_FOR_SALE|COMPLETE)
            ;;
        *)
            fail "App Store Connect 未回報可接受的送審狀態：${state:-空白}。"
            ;;
    esac
    log "App Review 送審成功：${EXPECTED_APP_ID} ${RELEASE_VERSION} (${RELEASE_BUILD})，狀態 ${state}。"
}

submit_existing_review() {
    assert_no_partial_api_auth
    has_api_auth ||
        fail "submit-review 要求 ASC_KEY_ID、ASC_ISSUER_ID、ASC_KEY_PATH。"
    assert_project_identity
    resolve_existing_release_numbers
    resolve_review_metadata
    submit_review_with_api
}

verify_existing_review() {
    local review_timeout="${IOS_REVIEW_TIMEOUT_SECONDS:-900}"
    local review_poll="${IOS_REVIEW_POLL_SECONDS:-15}"
    local state

    assert_no_partial_api_auth
    has_api_auth ||
        fail "verify-review 要求 ASC_KEY_ID、ASC_ISSUER_ID、ASC_KEY_PATH。"
    assert_project_identity
    resolve_existing_release_numbers
    state="$(
        ruby "${API_HELPER}" verify-review \
            --bundle-id "${EXPECTED_APP_ID}" \
            --version "${RELEASE_VERSION}" \
            --timeout "${review_timeout}" \
            --poll "${review_poll}"
    )"
    log "App Review 狀態驗證成功：${EXPECTED_APP_ID} ${RELEASE_VERSION}，狀態 ${state}。"
}

deploy_release() {
    build_release
    if has_api_auth; then
        deploy_with_api
    elif [[ "${IOS_XCODE_ACCOUNT_UPLOAD:-0}" == "1" ]]; then
        deploy_with_xcode_account
    else
        fail "deploy 要求 App Store Connect API 憑證；若只做本機 Xcode 帳號上傳，明確設定 IOS_XCODE_ACCOUNT_UPLOAD=1。"
    fi
}

release_to_app_store() {
    assert_no_partial_api_auth
    has_api_auth ||
        fail "release 要求 ASC_KEY_ID、ASC_ISSUER_ID、ASC_KEY_PATH，避免送審後無法驗證狀態。"
    build_release
    deploy_with_api
    resolve_review_metadata
    submit_review_with_api
}

require_command codesign
require_command find
require_command grep
require_command npm
require_command npx
require_command pod
require_command ruby
require_command security
require_command unzip
require_command xcodebuild
require_command xcrun

RELEASE_TEMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/spacein-ios-release.XXXXXX")"

case "${1:-}" in
    build)
        build_release
        ;;
    deploy)
        deploy_release
        ;;
    release)
        release_to_app_store
        ;;
    submit-review)
        submit_existing_review
        ;;
    verify-review)
        verify_existing_review
        ;;
    verify-archive)
        [[ -n "${2:-}" ]] || fail "verify-archive 需要 xcarchive 路徑。"
        verify_archive "$2"
        ;;
    verify-ipa)
        [[ -n "${2:-}" ]] || fail "verify-ipa 需要 IPA 路徑。"
        verify_ipa "$2"
        ;;
    -h|--help|help)
        usage
        ;;
    *)
        usage
        exit 1
        ;;
esac
