# Cloud Build 失敗診斷與修正報告

- **日期**：2026-05-13
- **專案**：spacein-493210
- **Build ID**：172ec490-3382-4622-82ec-504ef5b0134f
- **失敗步驟**：Step #4 `build-client`（前端 Docker 建置）

---

## 目錄

1. [問題摘要](#問題摘要)
2. [根本原因分析](#根本原因分析)
   - [套件版本不一致（主因）](#1-套件版本不一致主因)
   - [API 差異導致型別錯誤](#2-api-差異導致型別錯誤直接錯誤)
   - [為何本機看不出錯誤](#3-為何本機看不出錯誤)
3. [完整錯誤訊息](#完整錯誤訊息)
4. [修正內容](#修正內容)
5. [驗證步驟](#驗證步驟)
6. [預防措施](#預防措施)

---

## 問題摘要

執行 `gcloud builds submit --config cloudbuild.yaml` 時，在第 4 步（`build-client`，前端 Docker 建置）失敗，退出代碼為非零。

Cloud Build 的失敗訊息：

```
BUILD FAILURE: Build step failure: build step 4 "gcr.io/cloud-builders/docker"
failed: step exited with non-zero status: 1
```

本機執行 `npm run build:prod` 卻**成功**，兩者行為不一致，是本次排查的核心線索。

---

## 根本原因分析

### 1. 套件版本不一致（主因）

| 環境 | `@angular/fire` 版本 |
|------|---------------------|
| 本機 `node_modules` | `7.6.1`（舊版，已過期） |
| `package-lock.json` 鎖定版本 | `17.1.0` |
| `package.json` 宣告範圍 | `^17.0.0` |
| Cloud Build 實際安裝版本 | `17.1.0`（依 lockfile 安裝） |

本機的 `node_modules` 與 `package-lock.json` 嚴重不同步。

- 本機安裝的是過期版本 `7.6.1`，其 API 回傳型別為 `ModuleWithProviders`。
- Cloud Build 每次執行 `npm install --legacy-peer-deps` 從零安裝，依照 `package-lock.json` 安裝 `17.1.0`，其 API 回傳型別已改為 `EnvironmentProviders`。
- 兩者 API 行為完全不同，導致相同程式碼在不同環境有截然不同的結果。

### 2. API 差異導致型別錯誤（直接錯誤）

`@angular/fire` 在兩個主要版本中，`provideFirebaseApp()` 與 `provideFirestore()` 的回傳型別不同：

| 版本 | 回傳型別 | 在 NgModule 中的正確位置 |
|------|---------|------------------------|
| `7.6.1`（舊版） | `ModuleWithProviders<FirebaseAppModule>` | `imports` 陣列 |
| `17.1.0`（新版） | `EnvironmentProviders` | `providers` 陣列 |

Angular 的 `NgModule` 型別定義規範：

- `imports` 陣列：只接受 `Type<any> | ModuleWithProviders<{}> | any[]`
- `providers` 陣列：接受 `Provider | EnvironmentProviders`

原始程式碼將 `EnvironmentProviders` 放入 `imports`，違反型別定義，導致 TypeScript 編譯錯誤。

### 3. 為何本機看不出錯誤

Angular CLI 具有**增量編譯快取機制**，快取存放於 `.angular/cache/` 目錄。

```
frontend/
└── .angular/
    └── cache/   ← 增量編譯快取（本機有，Cloud Build 沒有）
```

- **本機**：`.angular/cache/` 保留了舊版 `@angular/fire@7.6.1` 時期編譯成功的快取，Angular CLI 偵測到未修改的檔案後跳過重新編譯，因此不會觸發型別錯誤。
- **Cloud Build**：`frontend/.dockerignore` 明確排除了 `.angular/` 目錄，Docker 容器內**絕對沒有快取**，每次都是全新完整編譯。全新編譯時 TypeScript 嚴格型別檢查會完整執行，錯誤因此被暴露。

這就是為何「本機成功、Cloud Build 失敗」的根本原因。

---

## 完整錯誤訊息

### 主要 TypeScript 型別錯誤（`app.module.ts`）

```
error TS2322: Type 'EnvironmentProviders' is not assignable to
              type 'any[] | Type<any> | ModuleWithProviders<{}>'

  app.module.ts:147:5 → provideFirebaseApp(() => initializeApp(firebase))
  app.module.ts:148:5 → provideFirestore(() => getFirestore())
```

### 連帶 Angular 模板錯誤（因模組解析失敗引發）

由於 `AppModule` 本身無法正確編譯，Angular 無法建立完整的模組依賴圖，進而導致大量 NG8001／NG8002 連帶錯誤：

```
error NG8001: 'app-dialog' is not a known element
error NG8002: Can't bind to 'ngModel' since it isn't a known property of 'input'
error NG8002: Can't bind to 'ngClass' since it isn't a known property of 'div'
error NG8004: No pipe found with name 'wordShroten'
...（共數十筆）
```

這些 NG 錯誤均為**連帶錯誤**，並非各個元件本身有問題，修正主因後會一併消失。

---

## 修正內容

### 修正 1：`app.module.ts` — 將 Firebase providers 移至正確陣列

**檔案位置**：`frontend/src/app/app.module.ts`

**修正前（錯誤）：**

```typescript
imports: [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  FormsModule,
  provideFirebaseApp(() => initializeApp(firebase)),  // ← 型別錯誤，不應在此
  provideFirestore(() => getFirestore()),              // ← 型別錯誤，不應在此
],
providers: [],
```

**修正後（正確）：**

```typescript
imports: [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  FormsModule,
],
providers: [
  provideFirebaseApp(() => initializeApp(firebase)),  // ← EnvironmentProviders 正確位置
  provideFirestore(() => getFirestore()),              // ← EnvironmentProviders 正確位置
],
```

**修正原因**：`@angular/fire@17` 採用 Angular 獨立元件（Standalone）風格的 Functional Providers，回傳型別為 `EnvironmentProviders`，必須放置於 `NgModule.providers` 中，而非 `NgModule.imports`。

### 修正 2：本機 `node_modules` 同步更新

在 `frontend/` 目錄執行以下指令，將本機 `@angular/fire` 從過期的 `7.6.1` 更新至 lockfile 指定的 `17.1.0`：

```bash
cd frontend
npm install
```

更新結果確認：

```
@angular/fire: 7.6.1 → 17.1.0 ✅
```

---

## 驗證步驟

### 本機驗證

```bash
cd frontend
npm run build:prod
# 預期結果：Build 成功，僅有 CSS 相關 Warning，無任何 Error
```

### Cloud Build 重新部署

```bash
gcloud builds submit --config cloudbuild.yaml
```

---

## 預防措施

| 情境 | 建議做法 |
|------|---------|
| 修改 `package.json` 後 | 立即執行 `npm install` 同步 lockfile 與 `node_modules` |
| Cloud Build 成功但本機失敗（或反之） | 優先懷疑 `node_modules` 版本不一致，執行 `npm ls @angular/fire` 確認 |
| 升級第三方套件時 | 閱讀 CHANGELOG，確認 API 回傳型別是否有 Breaking Change |
| 定期維護 | 執行 `npm outdated` 檢查過期套件，避免本機與 lockfile 長期不同步 |

---

## 結論

本次 Cloud Build 失敗的根本原因是**本機 `node_modules` 與 `package-lock.json` 版本不同步**，導致本機使用舊版 `@angular/fire@7.6.1` API，而 Cloud Build 使用新版 `@angular/fire@17.1.0` API，兩者對 `provideFirebaseApp()` 和 `provideFirestore()` 的放置位置要求不同，程式碼放錯位置後在全新編譯環境中產生 TypeScript 型別錯誤，進而引發大量連帶的 Angular 模板錯誤。

修正方式為將 Firebase `provide*` 函式從 `NgModule.imports` 移至 `NgModule.providers`，並同步更新本機 `node_modules`。
