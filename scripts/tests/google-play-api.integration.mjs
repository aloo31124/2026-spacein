#!/usr/bin/env node

import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const REPO_ROOT = resolve(import.meta.dirname, '../..');
const CLI_PATH = resolve(REPO_ROOT, 'scripts/google-play-api.mjs');
const PACKAGE_PATH = '/applications/com.spacein';

function json(response, status, payload) {
  response.writeHead(status, { 'content-type': 'application/json' });
  response.end(JSON.stringify(payload));
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return Buffer.concat(chunks);
}

async function main() {
  const temporaryDirectory = await mkdtemp(
    resolve(tmpdir(), 'spacein-play-api-test-'),
  );
  const fixtureAab = resolve(temporaryDirectory, 'fixture.aab');
  const testKeystore = resolve(temporaryDirectory, 'test-upload.jks');
  const githubOutput = resolve(temporaryDirectory, 'github-output.txt');
  await writeFile(fixtureAab, 'fake-aab');
  await writeFile(githubOutput, '');

  let nextEditNumber = 1;
  let publishedRelease = {
    name: '既有版本',
    status: 'completed',
    versionCodes: ['20'],
  };
  const pendingReleases = new Map();
  const pendingUploads = new Map();
  const deletedEdits = [];
  const committedEdits = [];
  const requests = [];

  const server = createServer(async (request, response) => {
    const url = new URL(request.url, 'http://127.0.0.1');
    const apiPrefix = '/androidpublisher/v3';
    const uploadPrefix = '/upload/androidpublisher/v3';
    const apiPath = url.pathname.startsWith(apiPrefix)
      ? url.pathname.slice(apiPrefix.length)
      : null;
    const uploadPath = url.pathname.startsWith(uploadPrefix)
      ? url.pathname.slice(uploadPrefix.length)
      : null;
    requests.push(`${request.method} ${url.pathname}${url.search}`);

    assert.equal(request.headers.authorization, 'Bearer test-token');

    if (request.method === 'POST' && apiPath === `${PACKAGE_PATH}/edits`) {
      const id = `edit-${nextEditNumber++}`;
      json(response, 200, { id, expiryTimeSeconds: '3600' });
      return;
    }

    const bundleListMatch = apiPath?.match(
      new RegExp(`^${PACKAGE_PATH}/edits/([^/]+)/bundles$`),
    );
    if (request.method === 'GET' && bundleListMatch) {
      json(response, 200, {
        bundles: [
          {
            versionCode: Number(publishedRelease.versionCodes[0]),
            sha256: 'existing',
          },
        ],
      });
      return;
    }

    const apkListMatch = apiPath?.match(
      new RegExp(`^${PACKAGE_PATH}/edits/([^/]+)/apks$`),
    );
    if (request.method === 'GET' && apkListMatch) {
      json(response, 200, { apks: [{ versionCode: 19 }] });
      return;
    }

    const tracksListMatch = apiPath?.match(
      new RegExp(`^${PACKAGE_PATH}/edits/([^/]+)/tracks$`),
    );
    if (request.method === 'GET' && tracksListMatch) {
      json(response, 200, {
        tracks: [{ track: 'internal' }, { track: 'production' }],
      });
      return;
    }

    const bundleUploadMatch = uploadPath?.match(
      new RegExp(`^${PACKAGE_PATH}/edits/([^/]+)/bundles$`),
    );
    if (request.method === 'POST' && bundleUploadMatch) {
      assert.equal(url.searchParams.get('uploadType'), 'media');
      assert.equal(
        request.headers['content-type'],
        'application/octet-stream',
      );
      const uploadBytes = await readBody(request);
      if (uploadBytes.length === Buffer.byteLength('fake-aab')) {
        assert.equal(uploadBytes.toString(), 'fake-aab');
      } else {
        assert.equal(uploadBytes.subarray(0, 2).toString(), 'PK');
      }
      const versionCode = Number(publishedRelease.versionCodes[0]) + 1;
      pendingUploads.set(bundleUploadMatch[1], versionCode);
      json(response, 200, {
        versionCode,
        sha1: 'mock-sha1',
        sha256: 'mock-sha256',
      });
      return;
    }

    const trackMatch = apiPath?.match(
      new RegExp(`^${PACKAGE_PATH}/edits/([^/]+)/tracks/([^/]+)$`),
    );
    if (request.method === 'PUT' && trackMatch) {
      const body = JSON.parse((await readBody(request)).toString());
      assert.equal(trackMatch[2], 'internal');
      assert.equal(body.track, 'internal');
      assert.deepEqual(body.releases[0].versionCodes, [
        String(pendingUploads.get(trackMatch[1])),
      ]);
      assert.equal(body.releases[0].status, 'completed');
      assert.equal(body.releases[0].releaseNotes[0].language, 'zh-TW');
      assert.match(body.releases[0].releaseNotes[0].text, /效能改善/);
      pendingReleases.set(trackMatch[1], body.releases[0]);
      json(response, 200, body);
      return;
    }
    if (request.method === 'GET' && trackMatch) {
      json(response, 200, {
        track: trackMatch[2],
        releases: [publishedRelease],
      });
      return;
    }

    const validateMatch = apiPath?.match(
      new RegExp(`^${PACKAGE_PATH}/edits/([^/]+):validate$`),
    );
    if (request.method === 'POST' && validateMatch) {
      assert.ok(pendingReleases.has(validateMatch[1]));
      json(response, 200, { id: validateMatch[1] });
      return;
    }

    const commitMatch = apiPath?.match(
      new RegExp(`^${PACKAGE_PATH}/edits/([^/]+):commit$`),
    );
    if (request.method === 'POST' && commitMatch) {
      assert.ok(pendingReleases.has(commitMatch[1]));
      publishedRelease = pendingReleases.get(commitMatch[1]);
      committedEdits.push(commitMatch[1]);
      json(response, 200, { id: commitMatch[1], expiryTimeSeconds: '0' });
      return;
    }

    const deleteMatch = apiPath?.match(
      new RegExp(`^${PACKAGE_PATH}/edits/([^/]+)$`),
    );
    if (request.method === 'DELETE' && deleteMatch) {
      deletedEdits.push(deleteMatch[1]);
      pendingReleases.delete(deleteMatch[1]);
      pendingUploads.delete(deleteMatch[1]);
      json(response, 200, {});
      return;
    }

    json(response, 404, {
      error: { message: `未 mock：${request.method} ${url.pathname}` },
    });
  });

  await new Promise((resolveListen) =>
    server.listen(0, '127.0.0.1', resolveListen),
  );
  const address = server.address();
  const origin = `http://127.0.0.1:${address.port}`;
  const environment = {
    ...process.env,
    GOOGLE_PLAY_API_TEST_MODE: '1',
    GOOGLE_PLAY_API_TEST_TOKEN: 'test-token',
    GOOGLE_PLAY_API_ROOT: `${origin}/androidpublisher/v3`,
    GOOGLE_PLAY_UPLOAD_ROOT: `${origin}/upload/androidpublisher/v3`,
    GOOGLE_PLAY_SERVICE_ACCOUNT_JSON: '',
    GOOGLE_APPLICATION_CREDENTIALS: '',
    GITHUB_OUTPUT: githubOutput,
  };

  const runCli = (...arguments_) =>
    execFileAsync(process.execPath, [CLI_PATH, ...arguments_], {
      cwd: REPO_ROOT,
      env: environment,
    });

  try {
    const nextVersion = await runCli('next-version');
    assert.equal(nextVersion.stdout.trim(), '21');
    assert.deepEqual(deletedEdits, ['edit-1']);

    await assert.rejects(
      runCli(
        'deploy',
        '--aab',
        fixtureAab,
        '--track',
        'internal',
        '--status',
        'completed',
        '--expected-version-code',
        '22',
      ),
      /Google Play 回報 versionCode=21.*預期 22/s,
    );
    assert.deepEqual(deletedEdits, ['edit-1', 'edit-2']);
    assert.deepEqual(committedEdits, []);

    const deployment = await runCli(
      'deploy',
      '--aab',
      fixtureAab,
      '--track',
      'internal',
      '--status',
      'completed',
      '--expected-version-code',
      '21',
      '--release-name',
      '2.2.1 (21)',
      '--whats-new-dir',
      '.github/whatsnew',
    );
    assert.match(deployment.stdout, /部署 commit 成功/);
    assert.deepEqual(committedEdits, ['edit-3']);

    const verification = await runCli(
      'verify',
      '--track',
      'internal',
      '--version-code',
      '21',
      '--status',
      'completed',
      '--retries',
      '1',
      '--delay-ms',
      '1',
    );
    assert.match(verification.stdout, /驗證成功/);
    assert.deepEqual(deletedEdits, ['edit-1', 'edit-2', 'edit-4']);
    assert.equal(publishedRelease.versionCodes[0], '21');

    assert.ok(
      requests.includes(
        'POST /upload/androidpublisher/v3/applications/com.spacein/edits/edit-3/bundles?uploadType=media',
      ),
    );
    assert.ok(
      requests.includes(
        'POST /androidpublisher/v3/applications/com.spacein/edits/edit-3:validate',
      ),
    );
    assert.ok(
      requests.includes(
        'POST /androidpublisher/v3/applications/com.spacein/edits/edit-3:commit',
      ),
    );

    await execFileAsync(
      'keytool',
      [
        '-genkeypair',
        '-noprompt',
        '-keystore',
        testKeystore,
        '-storepass',
        'test-password',
        '-keypass',
        'test-password',
        '-alias',
        'test-upload',
        '-keyalg',
        'RSA',
        '-keysize',
        '2048',
        '-validity',
        '3650',
        '-dname',
        'CN=SpaceIn CI Test,OU=Test,O=SpaceIn,L=Taipei,ST=Taiwan,C=TW',
      ],
      { env: environment },
    );
    const certificate = await execFileAsync(
      'keytool',
      [
        '-list',
        '-v',
        '-keystore',
        testKeystore,
        '-storepass',
        'test-password',
        '-alias',
        'test-upload',
      ],
      { env: environment },
    );
    const certificateSha256 = certificate.stdout
      .match(/SHA256:\s*([0-9A-F:]+)/i)?.[1]
      ?.toUpperCase();
    assert.ok(certificateSha256);

    const fullDeployment = await execFileAsync(
      'bash',
      [resolve(REPO_ROOT, 'scripts/android-release.sh'), 'deploy'],
      {
        cwd: REPO_ROOT,
        maxBuffer: 10 * 1024 * 1024,
        env: {
          ...environment,
          KEYSTORE_BASE64: (await readFile(testKeystore)).toString('base64'),
          KEYSTORE_PASSWORD: 'test-password',
          KEY_ALIAS: 'test-upload',
          KEY_PASSWORD: 'test-password',
          EXPECTED_UPLOAD_CERT_SHA256: certificateSha256,
          ANDROID_VERSION_NAME: '9.0.2-ci',
          SKIP_NPM_CI: '1',
          GOOGLE_PLAY_TRACK: 'internal',
          GOOGLE_PLAY_RELEASE_STATUS: 'completed',
        },
      },
    );
    assert.match(fullDeployment.stdout, /Google Play 部署與軌道查核全部成功/);
    assert.deepEqual(committedEdits, ['edit-3', 'edit-6']);
    assert.deepEqual(deletedEdits, [
      'edit-1',
      'edit-2',
      'edit-4',
      'edit-5',
      'edit-7',
    ]);
    assert.equal(publishedRelease.versionCodes[0], '22');
    const outputs = await readFile(githubOutput, 'utf8');
    assert.match(outputs, /aab_path=.*app-release\.aab/);
    assert.match(outputs, /version_code=22/);
    assert.match(outputs, /version_name=9\.0\.2-ci/);
    assert.match(outputs, /committed_edit_id=edit-6/);

    process.stdout.write(
      `Google Play API 整合測試成功，共驗證 ${requests.length} 個 HTTP requests。\n`,
    );
  } finally {
    await new Promise((resolveClose, rejectClose) =>
      server.close((error) => (error ? rejectClose(error) : resolveClose())),
    );
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
