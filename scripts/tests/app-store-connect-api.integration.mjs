#!/usr/bin/env node

import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { chmod, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const REPO_ROOT = resolve(import.meta.dirname, '../..');
const CLI_PATH = resolve(REPO_ROOT, 'scripts/app-store-connect-api.rb');
const APP_ID = '6504162405';
const VERSION_ID = 'version-4.3';
const BUILD_ID = 'build-2';
const SUBMISSION_ID = 'submission-1';

function json(response, status, payload) {
  response.writeHead(status, { 'content-type': 'application/json' });
  response.end(JSON.stringify(payload));
}

async function bodyJson(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString() || '{}');
}

async function main() {
  const temporaryDirectory = await mkdtemp(
    resolve(tmpdir(), 'spacein-app-store-connect-test-'),
  );
  const fakeBin = resolve(temporaryDirectory, 'bin');
  const keyPath = resolve(temporaryDirectory, 'AuthKey_TEST.p8');
  const xcrunPath = resolve(fakeBin, 'xcrun');
  await execFileAsync('mkdir', ['-p', fakeBin]);
  await writeFile(keyPath, 'test-key');
  await writeFile(
    xcrunPath,
    '#!/bin/sh\nprintf \'{"jwt":"eyJheader.payload.signature"}\\n\'\n',
  );
  await chmod(xcrunPath, 0o755);

  let appStoreState = 'PREPARE_FOR_SUBMISSION';
  let reviewState = null;
  let attachedBuildId = null;
  let releaseType = null;
  let whatsNew = null;
  let createdSubmissionCount = 0;
  let createdItemCount = 0;
  const requests = [];

  const server = createServer(async (request, response) => {
    const url = new URL(request.url, 'http://127.0.0.1');
    requests.push(`${request.method} ${url.pathname}${url.search}`);
    assert.equal(request.headers.authorization, 'Bearer eyJheader.payload.signature');

    if (request.method === 'GET' && url.pathname === '/v1/apps') {
      assert.equal(url.searchParams.get('filter[bundleId]'), 'com.spacein');
      json(response, 200, {
        data: [{ type: 'apps', id: APP_ID, attributes: { bundleId: 'com.spacein' } }],
      });
      return;
    }

    if (request.method === 'GET' && url.pathname === '/v1/appStoreVersions') {
      assert.equal(url.searchParams.get('filter[versionString]'), '4.3');
      json(response, 200, {
        data: [
          {
            type: 'appStoreVersions',
            id: VERSION_ID,
            attributes: {
              versionString: '4.3',
              appStoreState,
            },
          },
        ],
      });
      return;
    }

    if (request.method === 'GET' && url.pathname === '/v1/preReleaseVersions') {
      json(response, 200, {
        data: [
          {
            type: 'preReleaseVersions',
            id: 'prerelease-4.3',
            attributes: { version: '4.3', platform: 'IOS' },
          },
        ],
      });
      return;
    }

    if (request.method === 'GET' && url.pathname === '/v1/builds') {
      const buildNumber = url.searchParams.get('filter[version]');
      json(response, 200, {
        data: [
          {
            type: 'builds',
            id: buildNumber === '2' ? BUILD_ID : `build-${buildNumber}`,
            attributes: {
              version: buildNumber,
              processingState: buildNumber === '2' ? 'VALID' : 'PROCESSING',
            },
          },
        ],
      });
      return;
    }

    if (
      request.method === 'PATCH' &&
      url.pathname === `/v1/appStoreVersions/${VERSION_ID}/relationships/build`
    ) {
      const body = await bodyJson(request);
      attachedBuildId = body.data.id;
      assert.equal(body.data.type, 'builds');
      response.writeHead(204);
      response.end();
      return;
    }

    if (
      request.method === 'PATCH' &&
      url.pathname === `/v1/appStoreVersions/${VERSION_ID}`
    ) {
      const body = await bodyJson(request);
      releaseType = body.data.attributes.releaseType;
      json(response, 200, {
        data: {
          type: 'appStoreVersions',
          id: VERSION_ID,
          attributes: { appStoreState, releaseType },
        },
      });
      return;
    }

    if (
      request.method === 'GET' &&
      url.pathname ===
        `/v1/appStoreVersions/${VERSION_ID}/appStoreVersionLocalizations`
    ) {
      json(response, 200, {
        data: [
          {
            type: 'appStoreVersionLocalizations',
            id: 'localization-zh-Hant',
            attributes: { locale: 'zh-Hant' },
          },
        ],
      });
      return;
    }

    if (
      request.method === 'PATCH' &&
      url.pathname === '/v1/appStoreVersionLocalizations/localization-zh-Hant'
    ) {
      const body = await bodyJson(request);
      whatsNew = body.data.attributes.whatsNew;
      json(response, 200, {
        data: {
          type: 'appStoreVersionLocalizations',
          id: 'localization-zh-Hant',
          attributes: { locale: 'zh-Hant', whatsNew },
        },
      });
      return;
    }

    if (
      request.method === 'GET' &&
      url.pathname === `/v1/apps/${APP_ID}/reviewSubmissions`
    ) {
      json(response, 200, {
        data: reviewState
          ? [
              {
                type: 'reviewSubmissions',
                id: SUBMISSION_ID,
                attributes: { platform: 'IOS', state: reviewState },
                relationships: {
                  appStoreVersionForReview: {
                    data: { type: 'appStoreVersions', id: VERSION_ID },
                  },
                },
              },
            ]
          : [],
      });
      return;
    }

    if (request.method === 'POST' && url.pathname === '/v1/reviewSubmissions') {
      const body = await bodyJson(request);
      assert.equal(body.data.attributes.platform, 'IOS');
      assert.equal(body.data.relationships.app.data.id, APP_ID);
      reviewState = 'READY_FOR_REVIEW';
      createdSubmissionCount += 1;
      json(response, 201, {
        data: {
          type: 'reviewSubmissions',
          id: SUBMISSION_ID,
          attributes: { platform: 'IOS', state: reviewState },
        },
      });
      return;
    }

    if (
      request.method === 'POST' &&
      url.pathname === '/v1/reviewSubmissionItems'
    ) {
      const body = await bodyJson(request);
      assert.equal(
        body.data.relationships.reviewSubmission.data.id,
        SUBMISSION_ID,
      );
      assert.equal(body.data.relationships.appStoreVersion.data.id, VERSION_ID);
      createdItemCount += 1;
      json(response, 201, {
        data: {
          type: 'reviewSubmissionItems',
          id: 'item-1',
          attributes: { state: 'READY_FOR_REVIEW' },
        },
      });
      return;
    }

    if (
      request.method === 'PATCH' &&
      url.pathname === `/v1/reviewSubmissions/${SUBMISSION_ID}`
    ) {
      const body = await bodyJson(request);
      assert.equal(body.data.attributes.submitted, true);
      reviewState = 'WAITING_FOR_REVIEW';
      appStoreState = 'WAITING_FOR_REVIEW';
      json(response, 200, {
        data: {
          type: 'reviewSubmissions',
          id: SUBMISSION_ID,
          attributes: { platform: 'IOS', state: reviewState },
        },
      });
      return;
    }

    if (
      request.method === 'GET' &&
      url.pathname === `/v1/reviewSubmissions/${SUBMISSION_ID}`
    ) {
      json(response, 200, {
        data: {
          type: 'reviewSubmissions',
          id: SUBMISSION_ID,
          attributes: { platform: 'IOS', state: reviewState },
        },
      });
      return;
    }

    json(response, 404, {
      errors: [
        {
          code: 'NOT_MOCKED',
          title: '未建立測試回應',
          detail: `${request.method} ${url.pathname}`,
        },
      ],
    });
  });

  await new Promise((resolveListen) =>
    server.listen(0, '127.0.0.1', resolveListen),
  );
  const address = server.address();
  const environment = {
    ...process.env,
    PATH: `${fakeBin}:${process.env.PATH}`,
    ASC_API_TEST_MODE: '1',
    ASC_API_ORIGIN: `http://127.0.0.1:${address.port}`,
    ASC_KEY_ID: 'TESTKEY123',
    ASC_ISSUER_ID: 'test-issuer',
    ASC_KEY_PATH: keyPath,
  };
  const runCli = (...arguments_) =>
    execFileAsync('ruby', [CLI_PATH, ...arguments_], {
      cwd: REPO_ROOT,
      env: environment,
    });

  try {
    await assert.rejects(
      runCli(
        'submit-review',
        '--version',
        '4.3',
        '--build',
        '3',
        '--locale',
        'zh-Hant',
        '--whats-new',
        '測試版本說明',
        '--release-type',
        'AFTER_APPROVAL',
        '--timeout',
        '1',
        '--poll',
        '1',
      ),
      /尚未通過 Apple 驗證：PROCESSING/,
    );
    assert.equal(attachedBuildId, null);

    const submission = await runCli(
      'submit-review',
      '--version',
      '4.3',
      '--build',
      '2',
      '--locale',
      'zh-Hant',
      '--whats-new',
      '改善預約流程與行動裝置版面。',
      '--release-type',
      'AFTER_APPROVAL',
      '--timeout',
      '2',
      '--poll',
      '1',
    );
    assert.equal(submission.stdout.trim(), 'WAITING_FOR_REVIEW');
    assert.equal(attachedBuildId, BUILD_ID);
    assert.equal(releaseType, 'AFTER_APPROVAL');
    assert.equal(whatsNew, '改善預約流程與行動裝置版面。');
    assert.equal(createdSubmissionCount, 1);
    assert.equal(createdItemCount, 1);

    const idempotentSubmission = await runCli(
      'submit-review',
      '--version',
      '4.3',
      '--build',
      '2',
      '--locale',
      'zh-Hant',
      '--whats-new',
      '改善預約流程與行動裝置版面。',
      '--release-type',
      'AFTER_APPROVAL',
    );
    assert.equal(idempotentSubmission.stdout.trim(), 'WAITING_FOR_REVIEW');
    assert.equal(createdSubmissionCount, 1);
    assert.equal(createdItemCount, 1);

    const verification = await runCli(
      'verify-review',
      '--version',
      '4.3',
      '--timeout',
      '1',
      '--poll',
      '1',
    );
    assert.equal(verification.stdout.trim(), 'WAITING_FOR_REVIEW');

    appStoreState = 'PREPARE_FOR_SUBMISSION';
    reviewState = null;
    const shellSubmission = await execFileAsync(
      'bash',
      [resolve(REPO_ROOT, 'scripts/ios-release.sh'), 'submit-review'],
      {
        cwd: REPO_ROOT,
        env: {
          ...environment,
          IOS_WHATS_NEW: '由 shell 入口送出正式版審查。',
          IOS_RELEASE_TYPE: 'AFTER_APPROVAL',
          IOS_REVIEW_TIMEOUT_SECONDS: '2',
          IOS_REVIEW_POLL_SECONDS: '1',
        },
        maxBuffer: 10 * 1024 * 1024,
      },
    );
    assert.match(
      shellSubmission.stdout,
      /App Review 送審成功：com\.spacein 4\.3 \(2\)，狀態 WAITING_FOR_REVIEW/,
    );
    assert.equal(createdSubmissionCount, 2);
    assert.equal(createdItemCount, 2);

    assert.ok(
      requests.includes(
        `PATCH /v1/appStoreVersions/${VERSION_ID}/relationships/build`,
      ),
    );
    assert.ok(requests.includes('POST /v1/reviewSubmissionItems'));
    assert.ok(
      requests.includes(`PATCH /v1/reviewSubmissions/${SUBMISSION_ID}`),
    );

    process.stdout.write(
      `App Store Connect API 整合測試成功，共驗證 ${requests.length} 個 HTTP requests。\n`,
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
