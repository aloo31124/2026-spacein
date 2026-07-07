2026-06-29 13:33:32

## git commit
update(#設定集中): Angular 前端 Firestore 與 OAuth Client ID 集中至 environment
- environment.ts / environment.prod.ts 新增 firebase 與 googleOAuth 設定區塊
- app.module.ts 改引用 environment.firebase，移除散落的 firebase 設定物件與註解備份
- google-auth.service.ts 改用 environment.googleOAuth.initClientId 與 webClientId
- capacitor.config.ts serverClientId 改引用 environment.googleOAuth.webClientId
- 通過 tsc 型別檢查，grep 確認程式碼無殘留硬編碼設定
- 註記：GoogleAuth.initialize 沿用 587558372608(spaceincopy) 與其餘 328066296243 不同專案，保留原值未更動

## prompt 1
請將 angular 前端 firestore 與 OAuth 2 之 client id 與相關設定集中在同一個地方。

## prompt 1 response
- 盤點設定散落位置，共四處：
  - app.module.ts：Firebase/Firestore 設定物件
  - google-auth.service.ts:43：GoogleAuth.initialize 的 clientId（587558372608-…）
  - google-auth.service.ts:158：網頁 FedCM 的 client_id（328066296243-…）
  - capacitor.config.ts:10：原生 serverClientId（328066296243-…）
- 採 Angular 慣例，集中至既有 environment.ts / environment.prod.ts（angular.json 已有 fileReplacements 切換）：
  - 新增 firebase 區塊（整包 Firestore 設定）
  - 新增 googleOAuth.initClientId 與 googleOAuth.webClientId（兩個用途不同的 OAuth Client ID）
- 其餘四處全部改為引用 environment；capacitor.config.ts 以 import 取得同一份設定
- 驗證：npx tsc --noEmit -p tsconfig.app.json 通過；grep 確認無殘留硬編碼
- 提醒既有不一致：GoogleAuth.initialize 用的是 spaceincopy 專案(587558372608)，與 Firebase/FedCM/serverClientId 的 spacein-ec8ab(328066296243) 不同專案，已保留原值未更動，待使用者確認是否統一

## prompt 2
（/log-prompt）記錄這次對話，產生 prompt log。

## prompt 2 response
- 確認工作已收尾，Glob 今日 log 無既有檔，流水號取 1
- 於 .claude/skills/log-prompt/log/ 產出本紀錄檔（prompt20260629-1）
