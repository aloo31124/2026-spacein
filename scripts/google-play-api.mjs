#!/usr/bin/env node

import { createSign } from 'node:crypto';
import { appendFile, readdir, readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const PACKAGE_NAME = 'com.spacein';
const OFFICIAL_API_ROOT =
  'https://androidpublisher.googleapis.com/androidpublisher/v3';
const OFFICIAL_UPLOAD_ROOT =
  'https://androidpublisher.googleapis.com/upload/androidpublisher/v3';
const TOKEN_AUDIENCE = 'https://oauth2.googleapis.com/token';
const PUBLISH_SCOPE = 'https://www.googleapis.com/auth/androidpublisher';
const MAX_VERSION_CODE = 2_100_000_000;
const ALLOWED_RELEASE_STATUSES = new Set(['completed', 'draft']);

function testModeEnabled() {
  return process.env.GOOGLE_PLAY_API_TEST_MODE === '1';
}

function apiRoot() {
  return testModeEnabled() && process.env.GOOGLE_PLAY_API_ROOT
    ? process.env.GOOGLE_PLAY_API_ROOT
    : OFFICIAL_API_ROOT;
}

function uploadRoot() {
  return testModeEnabled() && process.env.GOOGLE_PLAY_UPLOAD_ROOT
    ? process.env.GOOGLE_PLAY_UPLOAD_ROOT
    : OFFICIAL_UPLOAD_ROOT;
}

function fail(message) {
  throw new Error(message);
}

function base64Url(value) {
  return Buffer.from(value).toString('base64url');
}

function parsePositiveInteger(value, label) {
  if (!/^[1-9]\d*$/.test(String(value ?? ''))) {
    fail(`${label} 必須是正整數。`);
  }
  return Number(value);
}

async function loadServiceAccount() {
  let raw = process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_JSON;
  if (!raw && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    raw = await readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8');
  }
  if (!raw) {
    fail(
      '未設定 GOOGLE_PLAY_SERVICE_ACCOUNT_JSON 或 GOOGLE_APPLICATION_CREDENTIALS。',
    );
  }

  let account;
  try {
    account = JSON.parse(raw);
  } catch {
    fail('Google Play 服務帳號不是有效 JSON。');
  }
  for (const field of ['client_email', 'private_key']) {
    if (!account[field]) {
      fail(`Google Play 服務帳號缺少 ${field}。`);
    }
  }
  return account;
}

async function getAccessToken(account) {
  const now = Math.floor(Date.now() / 1000);
  const encodedHeader = base64Url(
    JSON.stringify({ alg: 'RS256', typ: 'JWT' }),
  );
  const encodedPayload = base64Url(
    JSON.stringify({
      iss: account.client_email,
      scope: PUBLISH_SCOPE,
      aud: account.token_uri || TOKEN_AUDIENCE,
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsignedToken);
  signer.end();
  const assertion = `${unsignedToken}.${signer.sign(account.private_key, 'base64url')}`;

  const response = await fetch(account.token_uri || TOKEN_AUDIENCE, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.access_token) {
    fail(
      `Google OAuth token 取得失敗（HTTP ${response.status}）：` +
        `${payload.error_description || payload.error || '未知錯誤'}`,
    );
  }
  return payload.access_token;
}

async function authenticate() {
  if (testModeEnabled() && process.env.GOOGLE_PLAY_API_TEST_TOKEN) {
    return process.env.GOOGLE_PLAY_API_TEST_TOKEN;
  }
  return getAccessToken(await loadServiceAccount());
}

async function requestJson(token, url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      authorization: `Bearer ${token}`,
      ...(!options.body || typeof options.body === 'string'
        ? { 'content-type': 'application/json' }
        : {}),
      ...options.headers,
    },
  });
  const text = await response.text();
  let payload = {};
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      fail(`Google Play API 回傳非 JSON 內容（HTTP ${response.status}）。`);
    }
  }
  if (!response.ok) {
    const reason =
      payload?.error?.message || payload?.error_description || text || '未知錯誤';
    fail(`Google Play API 失敗（HTTP ${response.status}）：${reason}`);
  }
  return payload;
}

async function apiRequest(token, path, options = {}) {
  return requestJson(token, `${apiRoot()}${path}`, options);
}

function appPath(suffix = '') {
  return `/applications/${encodeURIComponent(PACKAGE_NAME)}${suffix}`;
}

async function withEdit(token, operation) {
  const edit = await apiRequest(token, appPath('/edits'), {
    method: 'POST',
    body: '{}',
  });
  if (!edit.id) {
    fail(`無法為 ${PACKAGE_NAME} 建立 Google Play edit。`);
  }

  try {
    return await operation(edit.id);
  } finally {
    await apiRequest(token, appPath(`/edits/${encodeURIComponent(edit.id)}`), {
      method: 'DELETE',
    }).catch((error) => {
      process.stderr.write(`[Google Play] 清理 edit 失敗：${error.message}\n`);
    });
  }
}

async function listBundles(token, editId) {
  return apiRequest(
    token,
    appPath(`/edits/${encodeURIComponent(editId)}/bundles`),
  );
}

async function listApks(token, editId) {
  return apiRequest(
    token,
    appPath(`/edits/${encodeURIComponent(editId)}/apks`),
  );
}

async function getTrack(token, editId, track) {
  return apiRequest(
    token,
    appPath(
      `/edits/${encodeURIComponent(editId)}/tracks/${encodeURIComponent(track)}`,
    ),
  );
}

async function listTracks(token, editId) {
  return apiRequest(
    token,
    appPath(`/edits/${encodeURIComponent(editId)}/tracks`),
  );
}

async function nextVersionCode(token) {
  return withEdit(token, async (editId) => {
    const [bundleResponse, apkResponse] = await Promise.all([
      listBundles(token, editId),
      listApks(token, editId),
    ]);
    const artifacts = [
      ...(bundleResponse.bundles || []),
      ...(apkResponse.apks || []),
    ];
    const versionCodes = artifacts.map(({ versionCode }) => Number(versionCode));
    const next = Math.max(0, ...versionCodes) + 1;
    if (next > MAX_VERSION_CODE) {
      fail(`下一個 versionCode ${next} 超過 Google Play 上限。`);
    }
    return next;
  });
}

function matchingRelease(track, versionCode, expectedStatus) {
  return (track.releases || []).find(
    (release) =>
      (release.versionCodes || []).includes(String(versionCode)) &&
      (!expectedStatus || release.status === expectedStatus),
  );
}

async function readReleaseNotes(directory) {
  if (!directory) return undefined;
  const absoluteDirectory = resolve(directory);
  const entries = await readdir(absoluteDirectory, { withFileTypes: true });
  const notes = [];
  for (const entry of entries) {
    const match = entry.isFile() && entry.name.match(/^whatsnew-(.+)$/);
    if (!match) continue;
    const text = await readFile(resolve(absoluteDirectory, entry.name), 'utf8');
    if (text.length > 500) {
      fail(`${entry.name} 超過 Google Play release note 500 字元上限。`);
    }
    notes.push({ language: match[1], text });
  }
  return notes.length ? notes : undefined;
}

async function validateTrackExists(token, editId, trackName) {
  const response = await listTracks(token, editId);
  const trackNames = (response.tracks || []).map(({ track }) => track);
  if (!trackNames.includes(trackName)) {
    fail(
      `Google Play 找不到軌道 ${trackName}。可用軌道：${trackNames.join(', ') || '無'}`,
    );
  }
}

async function uploadBundle(token, editId, aabPath) {
  const bytes = await readFile(aabPath);
  const url =
    `${uploadRoot()}${appPath(
      `/edits/${encodeURIComponent(editId)}/bundles`,
    )}?uploadType=media`;
  return requestJson(token, url, {
    method: 'POST',
    headers: { 'content-type': 'application/octet-stream' },
    body: bytes,
    signal: AbortSignal.timeout(120_000),
  });
}

async function deployBundle(
  token,
  {
    aabPath,
    trackName,
    expectedStatus,
    releaseName,
    releaseNotesDirectory,
    expectedVersionCode,
  },
) {
  const file = await stat(aabPath).catch(() => null);
  if (!file?.isFile() || file.size === 0 || !aabPath.endsWith('.aab')) {
    fail(`AAB 不存在、為空或副檔名錯誤：${aabPath}`);
  }
  if (!ALLOWED_RELEASE_STATUSES.has(expectedStatus)) {
    fail(
      `不支援 release status=${expectedStatus}；僅允許 completed 或 draft。`,
    );
  }

  const edit = await apiRequest(token, appPath('/edits'), {
    method: 'POST',
    body: '{}',
  });
  if (!edit.id) {
    fail(`無法為 ${PACKAGE_NAME} 建立 Google Play edit。`);
  }

  let committed = false;
  try {
    await validateTrackExists(token, edit.id, trackName);
    const bundle = await uploadBundle(token, edit.id, aabPath);
    const uploadedVersionCode = Number(bundle.versionCode);
    if (!Number.isInteger(uploadedVersionCode) || uploadedVersionCode <= 0) {
      fail('Google Play 上傳回應缺少有效 versionCode。');
    }
    if (
      expectedVersionCode &&
      uploadedVersionCode !== Number(expectedVersionCode)
    ) {
      fail(
        `Google Play 回報 versionCode=${uploadedVersionCode}，` +
          `但建置產物預期 ${expectedVersionCode}。`,
      );
    }

    const releaseNotes = await readReleaseNotes(releaseNotesDirectory);
    await apiRequest(
      token,
      appPath(
        `/edits/${encodeURIComponent(edit.id)}/tracks/${encodeURIComponent(
          trackName,
        )}`,
      ),
      {
        method: 'PUT',
        body: JSON.stringify({
          track: trackName,
          releases: [
            {
              name: releaseName,
              status: expectedStatus,
              versionCodes: [String(uploadedVersionCode)],
              ...(releaseNotes ? { releaseNotes } : {}),
            },
          ],
        }),
      },
    );
    await apiRequest(
      token,
      appPath(`/edits/${encodeURIComponent(edit.id)}:validate`),
      { method: 'POST' },
    );
    const committedEdit = await apiRequest(
      token,
      appPath(`/edits/${encodeURIComponent(edit.id)}:commit`),
      { method: 'POST' },
    );
    if (!committedEdit.id) {
      fail('Google Play edit commit 回應缺少 edit ID。');
    }
    committed = true;
    return {
      editId: committedEdit.id,
      versionCode: uploadedVersionCode,
      track: trackName,
      status: expectedStatus,
    };
  } finally {
    if (!committed) {
      await apiRequest(
        token,
        appPath(`/edits/${encodeURIComponent(edit.id)}`),
        { method: 'DELETE' },
      ).catch((error) => {
        process.stderr.write(`[Google Play] 清理 edit 失敗：${error.message}\n`);
      });
    }
  }
}

async function verifyTrack(
  token,
  { trackName, versionCode, expectedStatus, retries, delayMs },
) {
  let lastSeen = '找不到指定版本';
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    const result = await withEdit(token, async (editId) => {
      const track = await getTrack(token, editId, trackName);
      const release = matchingRelease(track, versionCode, expectedStatus);
      lastSeen = JSON.stringify(
        (track.releases || []).map(({ status, versionCodes }) => ({
          status,
          versionCodes,
        })),
      );
      return release;
    });
    if (result) {
      return result;
    }
    if (attempt < retries) {
      process.stderr.write(
        `[Google Play] 第 ${attempt}/${retries} 次尚未查到 ` +
          `${trackName} versionCode ${versionCode}，${delayMs}ms 後重試。\n`,
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  fail(
    `Google Play 軌道驗證失敗：${trackName} 未出現 versionCode ` +
      `${versionCode}（status=${expectedStatus}）。目前 releases=${lastSeen}`,
  );
}

function argumentValue(args, name, fallback) {
  const index = args.indexOf(name);
  if (index === -1) return fallback;
  if (!args[index + 1]) fail(`${name} 缺少值。`);
  return args[index + 1];
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (!['next-version', 'deploy', 'verify'].includes(command)) {
    process.stderr.write(
      '用法：\n' +
        '  node scripts/google-play-api.mjs next-version\n' +
        '  node scripts/google-play-api.mjs deploy --aab app-release.aab ' +
        '--track internal --status completed --expected-version-code 21\n' +
        '  node scripts/google-play-api.mjs verify --track internal ' +
        '--version-code 21 --status completed [--retries 12] [--delay-ms 10000]\n',
    );
    process.exitCode = command ? 2 : 0;
    return;
  }

  const token = await authenticate();
  if (command === 'next-version') {
    process.stdout.write(`${await nextVersionCode(token)}\n`);
    return;
  }

  const trackName = argumentValue(args, '--track');
  const expectedStatus = argumentValue(args, '--status', 'completed');
  if (command === 'deploy') {
    const expectedVersionCode = parsePositiveInteger(
      argumentValue(args, '--expected-version-code'),
      'expectedVersionCode',
    );
    const result = await deployBundle(token, {
      aabPath: resolve(argumentValue(args, '--aab')),
      trackName,
      expectedStatus,
      expectedVersionCode,
      releaseName: argumentValue(args, '--release-name'),
      releaseNotesDirectory: argumentValue(args, '--whats-new-dir'),
    });
    if (process.env.GITHUB_OUTPUT) {
      await appendFile(
        process.env.GITHUB_OUTPUT,
        `committed_edit_id=${result.editId}\n` +
          `version_code=${result.versionCode}\n`,
      );
    }
    process.stdout.write(
      `[Google Play] 部署 commit 成功：package=${PACKAGE_NAME}、` +
        `track=${result.track}、versionCode=${result.versionCode}、` +
        `status=${result.status}、edit=${result.editId}。\n`,
    );
    return;
  }

  const versionCode = parsePositiveInteger(
    argumentValue(args, '--version-code'),
    'versionCode',
  );
  const retries = parsePositiveInteger(
    argumentValue(args, '--retries', '12'),
    'retries',
  );
  const delayMs = parsePositiveInteger(
    argumentValue(args, '--delay-ms', '10000'),
    'delayMs',
  );
  const release = await verifyTrack(token, {
    trackName,
    versionCode,
    expectedStatus,
    retries,
    delayMs,
  });
  process.stdout.write(
    `[Google Play] 驗證成功：package=${PACKAGE_NAME}、track=${trackName}、` +
      `versionCode=${versionCode}、status=${release.status}。\n`,
  );
}

main().catch((error) => {
  process.stderr.write(`[Google Play] 錯誤：${error.message}\n`);
  process.exitCode = 1;
});
