# Google Auth 登入機制 — Skills 文件

## 概覽

本專案使用 Google OAuth2 作為主要登入方式，支援：
- **手機 App（Android）**：Capacitor GoogleAuth 原生插件
- **網頁（Web）**：Google Identity Services（FedCM / One Tap）

後端以 Firebase Firestore 儲存使用者資料，並發行 JWT 作為 API 授權憑證。

---

## 架構圖

```
[使用者]
   │
   ├─ 手機 App ──▶ Capacitor GoogleAuth Plugin ──▶ Google OAuth2
   │                                                       │
   └─ 網頁 ────▶ Google Identity Services (FedCM)  ────────┘
                                                           │
                                              idToken / accessToken
                                                           │
                                                   [Angular 前端]
                                                           │
                                          POST /api/auth/regist/user/add  (首次)
                                          GET  /api/auth/user/:email      (查詢)
                                                           │
                                                   [Node.js 後端]
                                                           │
                                              Firebase Firestore (User collection)
                                                           │
                                              回傳 JWT Token (5 min 效期)
                                                           │
                                          Capacitor Preferences 儲存 Token
```

---

## 前端

### 1. 核心服務

**檔案：** [frontend/src/app/auth-route/services/google-auth.service.ts](frontend/src/app/auth-route/services/google-auth.service.ts)

| 方法 | 說明 |
|------|------|
| `loginByGoogleCap()` | Android/iOS 原生登入，呼叫 Capacitor GoogleAuth plugin |
| `loginByGoogleWebFedCM()` | 網頁登入，使用 Google FedCM One Tap UI |
| `checkToken()` | App 啟動時自動驗證 Token（720 小時 session） |
| `setToken(user)` | 將使用者資訊與 Token 存入 Capacitor Preferences |
| `cleanToken()` | 清除本地 Token（登出用） |
| `parseJwt(token)` | 解析 Google JWT credential |
| `registerUserForFirstLogin(user)` | 首次登入時呼叫後端建立帳號 |
| `logout()` | Google 登出 + 清除 Token + 導回登入頁 |
| `isAuthenticated()` | 供 AuthGuard 判斷是否已登入 |

### 2. 登入頁元件

**檔案：** [frontend/src/app/auth-route/components/login-page/login-page.component.ts](frontend/src/app/auth-route/components/login-page/login-page.component.ts)

```typescript
// 平台判斷邏輯
if (Capacitor.isNativePlatform()) {
  this.googleAuthService.loginByGoogleCap();    // 手機
} else {
  this.googleAuthService.loginByGoogleWebFedCM(); // 網頁
}
```

### 3. 後端 HTTP 呼叫

**檔案：** [frontend/src/app/auth-route/services/register.service.ts](frontend/src/app/auth-route/services/register.service.ts)

| 方法 | HTTP | 路徑 | 說明 |
|------|------|------|------|
| `findUser(email)` | GET | `/api/auth/user/:email` | 查詢使用者是否存在 |
| `registUserAdd(user)` | POST | `/api/auth/regist/user/add` | 首次登入建立帳號 |
| `registUserUpdate(user)` | POST | `/api/auth/regist/user/update` | 更新使用者資料 |

### 4. Route Guard

**檔案：** [frontend/src/app/auth-route/services/auth-guard.service.ts](frontend/src/app/auth-route/services/auth-guard.service.ts)

- 實作 `CanActivate`、`CanActivateChild`
- 未登入時自動導向 `/login`
- 套用於 `app-routing.module.ts` 的 `/home` 路由

### 5. 使用者模型

**檔案：** [frontend/src/app/auth-route/models/google-auth-user.model.ts](frontend/src/app/auth-route/models/google-auth-user.model.ts)

```typescript
interface GoogleAuthUser {
  userFirestoreId: string;
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  authentication: {
    idToken: string;
    accessToken: string;
  };
  paymentList: any[];
  permissionList: any[];
}
```

### 6. Token 儲存

使用 `@capacitor/preferences`（`Capacitor.Preferences`）：

| Key | 內容 |
|-----|------|
| `currentUser` | 完整使用者物件（JSON） |
| `token` | JWT Token 字串 |

Session 逾時：**720 小時（30 天）**

---

## Capacitor 設定

**檔案：** [frontend/capacitor.config.ts](frontend/capacitor.config.ts)

```typescript
plugins: {
  GoogleAuth: {
    scopes: ['profile', 'email'],
    serverClientId: '328066296243-5opekodfa93rria1e8utcql4rkrbvktq.apps.googleusercontent.com',
    forceCodeForRefreshToken: true
  }
}
```

### Google Client ID 對照表

| 用途 | Client ID |
|------|-----------|
| Capacitor 手機原生 | `587558372608-jnei0k5eh8japakn4hs4kok2mld4m0qj.apps.googleusercontent.com` |
| Web FedCM One Tap | `830518362912-qhmt6tgd8djdv57qrdivu877u6ng5j0j.apps.googleusercontent.com` |
| serverClientId（refresh token） | `328066296243-5opekodfa93rria1e8utcql4rkrbvktq.apps.googleusercontent.com` |

---

## 後端

### 1. API 端點

**檔案：** [backend/src/controllers/auth.api.controller.js](backend/src/controllers/auth.api.controller.js)

| Method | 路徑 | 說明 |
|--------|------|------|
| POST | `/api/auth/login` | Email/密碼登入 |
| POST | `/api/auth/logout` | 登出（Token 加入黑名單） |
| POST | `/api/auth/jwt` | 驗證 JWT |
| GET | `/api/auth/user/:email` | 以 email 查詢使用者 |
| POST | `/api/auth/regist/user/add` | 建立新帳號 |
| POST | `/api/auth/regist/user/update` | 更新帳號資料 |
| POST | `/api/auth/regist/mail` | 寄送驗證信 |
| POST | `/api/auth/regist/verify/code` | 驗證 Email 驗證碼 |

### 2. Auth Service

**檔案：** [backend/src/services/auth.service.js](backend/src/services/auth.service.js)

| 函式 | 說明 |
|------|------|
| `addAccount(email)` | 以 email 在 Firestore 建立新使用者 |
| `updateAccount(user)` | 更新 Firestore 使用者資料 |
| `createJwtToken(req)` | 簽發 JWT（效期 5 分鐘） |
| `verifyJwt(req)` | 驗證 Authorization header 中的 JWT |
| `logout(req)` | 將 Token 加入記憶體黑名單 |

### 3. JWT 工具

**檔案：** [backend/src/utils/jwt.js](backend/src/utils/jwt.js)

```javascript
// Token 效期：5 分鐘
createToken(payload, expiresIn = '5m')

// 驗證並檢查黑名單
verifyToken(token)

// 登出：加入 blacklist Set
logoutToken(token)
```

> **注意：** 黑名單為記憶體 `Set`，伺服器重啟後黑名單消失。

### 4. Firestore 使用者文件結構

**檔案：** [backend/src/models/user.model.js](backend/src/models/user.model.js)

```javascript
{
  email, name, displayName, familyName, givenName,
  imageUrl, idToken, serverAuthCode,
  authentication: { idToken, accessToken },
  state, phone, role, pay, password,
  createdAt
}
```

Collection：`User`

---

## 完整登入流程

### 手機（Android）

```
1. 使用者點擊「Google 登入」
2. loginByGoogleCap() 呼叫 GoogleAuth.signIn()
3. Capacitor plugin 開啟 Google OAuth 授權視窗
4. 取得 { id, email, name, imageUrl, authentication: { idToken, accessToken } }
5. registerService.findUser(email) → GET /api/auth/user/:email
   ├─ 404（新使用者）→ registerUserForFirstLogin() → POST /api/auth/regist/user/add
   └─ 200（既有使用者）→ 繼續
6. setToken(user) → 儲存至 Capacitor Preferences
7. 導向 /home
```

### 網頁（Web FedCM）

```
1. 使用者點擊「Google 登入」
2. loginByGoogleWebFedCM() 初始化 google.accounts.id
3. google.accounts.id.prompt() 顯示 One Tap UI
4. 取得 JWT credential
5. parseJwt(credential) → 解析 { name, email, picture }
6. 流程同手機步驟 5-7
```

### 後端 JWT 驗證（每次 API 請求）

```
前端：Authorization: Bearer <JWT>
        ↓
後端：verifyJwt() → jsonwebtoken.verify() → 檢查黑名單
        ↓
    合法：繼續處理請求
    非法：401 Unauthorized
```

---

## Android 設定重點

**相關檔案：**
- [frontend/android/app/build.gradle](frontend/android/app/build.gradle) — App ID: `com.spacein`、簽名設定
- [frontend/android/app/src/main/AndroidManifest.xml](frontend/android/app/src/main/AndroidManifest.xml) — `INTERNET` 權限
- `frontend/android/app/google-services.json` — Firebase 設定（含 Google Sign-In SHA）

> Android 使用 Google Sign-In 必須在 Google Cloud Console 和 Firebase 設定正確的 **SHA-1/SHA-256** 憑證指紋。

---

## 相依套件

| 套件 | 版本 | 用途 |
|------|------|------|
| `@codetrix-studio/capacitor-google-auth` | 3.4.0-rc.0 | 手機原生 Google 登入 |
| `@capacitor/preferences` | 5.0.8 | Token 本地儲存 |
| `@capacitor-community/apple-sign-in` | 6.0.0 | iOS Apple 登入 |
| `jwt-decode` | 4.0.0 | 前端解析 JWT |
| `jsonwebtoken` | — | 後端簽發/驗證 JWT |

---

## 已知問題與建議

| 問題 | 嚴重度 | 建議 |
|------|--------|------|
| JWT secret 硬寫在程式碼 `'SECRET_KEY'` | 高 | 改用環境變數 `process.env.JWT_SECRET` |
| JWT 效期 5 分鐘但無 refresh token 機制 | 中 | 實作 refresh token 或延長效期 |
| Token 黑名單存記憶體，重啟後失效 | 中 | 改用 Redis 或 Firestore 持久化黑名單 |
| Email 密碼登入密碼明文存 Firestore | 高 | 改用 bcrypt hash 儲存密碼 |
