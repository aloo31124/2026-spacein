---
name: iOS WebView 繁體中文字型
description: >
  修改或診斷 Capacitor iOS、WKWebView、iOS Simulator 中繁體中文顯示成問號、
  方框或缺字，尤其是 input、button、select、textarea 的文字或 placeholder
  異常時，必須參考此文件。
---

# iOS WebView 繁體中文字型

## 根因判斷

先確認原始 Angular 模板、production bundle 與
`ios/App/App/public/` 內的字串仍是 UTF-8。若 bundle 內可找到正確 Unicode，
再由 Simulator 截圖及 App 的 WebKit log 判斷是否為系統字型缺漏，而不是
程式碼編碼。

iOS WKWebView 的表單控制項可能採用獨立的原生控制項字型，不保證繼承頁面
字型。部分 Simulator runtime 也可能沒有安裝 `PingFang TC` 等完整 CJK
字型；此時只設定系統 fallback 仍不足，所有 DOM 繁中都會顯示為缺字符號，
而已點陣化在圖片內的中文仍可正常顯示。

## 專案設定

- `frontend/src/index.html` 的根元素使用 `lang="zh-Hant-TW"`，讓 WebKit 以
  繁體中文語系選擇字形。
- `frontend/package.json` 固定使用 OFL-1.1 授權的
  `@fontsource/noto-sans-tc`，讓 production build 將繁中字型一起打包。
- `frontend/src/styles.scss` 只以 `@font-face` 載入繁中 400、700 字重的
  WOFF2，避免打包套件內不需要的全部語系、字重及重複 WOFF；`html` 將
  `Noto Sans TC` 設為第一順位，再接平台系統字型 fallback。
- `button`、`input`、`select`、`textarea` 明確使用 `font-family: inherit`，
  避免 iOS 原生控制項另選不含繁中字形的字型。
- 不直接複製 Apple 系統字型；使用可隨 App 散布的 Fontsource 套件，
  避免 Simulator runtime 缺字與字型授權風險。

## 驗證

1. 執行 production build，確認 `dist/space-in/index.html` 保留
   `lang="zh-Hant-TW"`。
2. 檢查輸出 CSS 含 `Noto Sans TC`、表單控制項的
   `font-family: inherit`，並確認輸出目錄含繁中 400、700 字重的字型檔。
3. 執行 `npx cap sync ios`，確認同一份設定已複製到
   `ios/App/App/public/`。
4. 以 `xcodebuild` 建置 Simulator App，安裝後實際檢查登入頁與帳號頁的
   一般文字、按鈕、輸入值及 placeholder；若仍顯示舊畫面，先刪除
   Simulator 內舊 App 再重裝，排除 WKWebView 靜態資源快取。
