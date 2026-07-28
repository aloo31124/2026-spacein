#!/usr/bin/env node

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const webClientId = '1025423218880-ae9p8055o7jllcfja72jfd1smipdlf35.apps.googleusercontent.com';
const androidClientId = '328066296243-uo6thclvu7610suo0ktr0f6hi0k0s4kd.apps.googleusercontent.com';
const iosClientId = '1025423218880-b6ovls4n8vse8d2ihiq6db1vd0ab0lek.apps.googleusercontent.com';
const reversedIosClientId = 'com.googleusercontent.apps.1025423218880-b6ovls4n8vse8d2ihiq6db1vd0ab0lek';
const allowedClientIds = new Set([webClientId, androidClientId, iosClientId]);

function read(relativePath) {
  return readFileSync(resolve(repositoryRoot, relativePath), 'utf8');
}

function assertContains(source, expected, message) {
  assert.ok(source.includes(expected), message);
}

for (const environmentPath of [
  'frontend/src/environments/environment.ts',
  'frontend/src/environments/environment.prod.ts',
]) {
  const environment = read(environmentPath);
  assertContains(environment, `webClientId: '${webClientId}'`, `${environmentPath} 的 webClientId 錯誤`);
  assertContains(environment, `androidClientId: '${androidClientId}'`, `${environmentPath} 的 androidClientId 錯誤`);
  assertContains(environment, `iosClientId: '${iosClientId}'`, `${environmentPath} 的 iosClientId 錯誤`);
  assert.ok(!environment.includes('initClientId'), `${environmentPath} 不可再保留 initClientId`);
  assert.ok(!environment.includes('nativeServerClientId'), `${environmentPath} 不可再保留 nativeServerClientId`);
}

const googleAuthService = read('frontend/src/app/auth-route/services/google-auth.service.ts');
assertContains(
  googleAuthService,
  'clientId: environment.googleOAuth.webClientId',
  'GoogleAuth.initialize() 必須使用 webClientId',
);

const capacitorConfig = read('frontend/capacitor.config.ts');
assertContains(
  capacitorConfig,
  'iosClientId: environment.googleOAuth.iosClientId',
  'Capacitor iOS 必須使用 iosClientId',
);
assertContains(
  capacitorConfig,
  'serverClientId: environment.googleOAuth.webClientId',
  'Capacitor serverClientId 必須使用 Web client',
);
assert.ok(!/^\s*clientId:/m.test(capacitorConfig), 'Capacitor 不可設定跨平台共用 clientId');
assert.ok(!/^\s*androidClientId:/m.test(capacitorConfig), 'Android client 不可傳給 requestIdToken');

const androidStrings = read('frontend/android/app/src/main/res/values/strings.xml');
assertContains(
  androidStrings,
  `<string name="server_client_id">${webClientId}</string>`,
  'Android server_client_id 必須使用 Web client',
);

const googleServiceInfo = read('frontend/ios/App/App/GoogleService-Info.plist');
assertContains(googleServiceInfo, `<string>${iosClientId}</string>`, 'GoogleService-Info.plist 的 CLIENT_ID 錯誤');
assertContains(
  googleServiceInfo,
  `<string>${reversedIosClientId}</string>`,
  'GoogleService-Info.plist 的 REVERSED_CLIENT_ID 錯誤',
);

const iosInfo = read('frontend/ios/App/App/Info.plist');
assertContains(iosInfo, `<string>${reversedIosClientId}</string>`, 'Info.plist 的 Google URL Scheme 錯誤');

const readme = read('README.md');
for (const expected of [
  'http://localhost:4201',
  'https://spacein.duckdns.org',
  'http://localhost:4201/\\_\\_/auth/handler',
  'https://spacein.duckdns.org/\\_\\_/auth/handler',
  '93:5C:5B:CF:85:43:61:71:D5:89:24:D3:DF:F2:EB:7A:DE:42:D0:BF',
  ...allowedClientIds,
]) {
  assertContains(readme, expected, `README 缺少 OAuth 設定：${expected}`);
}

const scan = spawnSync(
  'rg',
  [
    '-o',
    '--hidden',
    '--glob', '!**/.git/**',
    '--glob', '!**/node_modules/**',
    '--glob', '!**/Pods/**',
    '[0-9]{9,}-[a-z0-9]+\\.apps\\.googleusercontent\\.com',
    '.',
  ],
  { cwd: repositoryRoot, encoding: 'utf8' },
);
assert.ok(scan.status === 0 || scan.status === 1, `無法掃描 client id：${scan.stderr}`);

const discoveredClientIds = new Set(
  scan.stdout
    .split('\n')
    .map((line) => line.slice(line.lastIndexOf(':') + 1))
    .filter(Boolean),
);
assert.deepEqual(
  [...discoveredClientIds].sort(),
  [...allowedClientIds].sort(),
  '全專案只能存在 README 指定的三組 Google OAuth client id',
);

console.log('Google OAuth 設定一致性檢查通過：全專案僅保留指定的 Web、Android、iOS 三組 client id。');
