# Space In V2

## 主要功能
此為提供補習班空間預約功能,主要功能概述為：
1. [空間預約] 可選擇補習班預約教室(包含基本時間卡控)。
2. [已預約] 檢視預約者預約狀況，並取消預約。
3. [空間總覽] 空間擁有者可檢視該空間預約情況。
4. [購買方案] 串接第三方綠介金流，供補習班付款。


UI/UX(Figma): 
https://www.figma.com/file/h53EROFlODb5UPcBMxQXsH/Space-In

操作畫面參考:
https://photos.app.goo.gl/PsUfABJvewWt2reh7


## get start
1. npm install
2. ng s

## iOS 打包注意事項
1. `ios/App/Podfile` 已在 `post_install` 關閉 `ENABLE_USER_SCRIPT_SANDBOXING`，避免 Xcode Archive 時 CocoaPods 的 `[CP] Embed Pods Frameworks` 因沙箱限制無法讀取 `Pods-App-frameworks.sh`。
2. `ios/App/Podfile` 也已停用 Pods targets 的 `CODE_SIGNING_ALLOWED` / `CODE_SIGNING_REQUIRED`，避免第三方 framework（例如 `GTMSessionFetcher.framework`）在 Debug 裝置建置時被 CocoaPods 個別簽章，進而觸發 `errSecInternalComponent`。
3. 若更新 Pod 或重新同步 Capacitor，請在 `frontend/ios/App` 目錄重新執行 `pod install`，讓上述設定同步回 Xcode 專案。
4. `App.xcodeproj` 使用 Automatic Signing，並綁定目前的 `DEVELOPMENT_TEAM`；若本機尚未登入對應 Apple Developer 帳號，仍需先在 Xcode 的 Signing & Capabilities 確認 Team 與 provisioning profile 可正常建立。




## 版本
v2.1: 
1. 新增 主要功能, get start 說明  2024/3/18
