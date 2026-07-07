----
name: ECPay 綠界金流整合
description: >
  本專案後端使用 ecpay_aio_nodejs SDK 串接綠界金流（信用卡、ATM、超商代碼、Web ATM 等）。
  修改或新增 ECPay 付款流程、付款參數產生、付款結果回呼（ReturnURL/ClientBackURL）、
  付款歷史紀錄寫入、使用者方案升級等任何金流相關邏輯時，必須參考此檔案。
  關鍵字：ECPay、綠界、aio_check_out_all、MerchantTradeDate、MerchantTradeNo、付款、金流、訂單、儲值、方案。
----

## 適用範圍

- 後端服務：[backend/src/services/pay-ecpay.service.js](../../../backend/src/services/pay-ecpay.service.js)
- 對應 Models：`payment.model`、`paymentHistory.model`、`userToPayment.model`
- 對應路由：`/api/pay/ecpay/pay/result/server`（伺服器端 callback）、`/api/pay/ecpay/pay/result/client`（前端導回）

---

## ECPay 參數格式硬性規範（必須遵守）

綠界 SDK 對部分欄位有嚴格的字串格式與長度限制，違反會直接被 SDK 擋下並回傳
`Wrong format of param XXX or length exceeded`，此類錯誤是 ECPay 線上付款最常見的故障。

### MerchantTradeDate

- **格式**：`yyyy/MM/dd HH:mm:ss`（共 19 字元，例如 `2026/05/21 14:30:45`）。
- **時區**：必須為台北時區（UTC+8），不可使用 UTC 直接輸出，也不可使用本機時區（部署在 GCP Cloud Run 預設為 UTC，會造成時間落差）。
- **不可使用 `toLocaleString('zh-TW', …)`**：不同 Node.js 版本/環境的輸出不一致（可能含「上午/下午」、不同分隔符、長度偏差），會被 ECPay 拒收。
- **正確做法**：以 `getUTCFullYear/Month/Date/Hours/Minutes/Seconds` 並 `padStart(2, '0')` 手動組字串，並把 `Date.now()` 加 8 小時轉成台北時區，產出嚴格符合格式的字串。

### MerchantTradeNo

- 必須為英數字、長度 ≤ 20 字元。
- 目前使用 `'test' + new Date().getTime()`（測試環境）；正式環境上線前需改為具備可追溯性的訂單編號（例如帶上 userId 雜湊或專案前綴）。

### TotalAmount

- 必須是整數（新台幣元，無小數），SDK 會自行轉字串。

### ItemName / TradeDesc

- ItemName 多商品請用 `#` 分隔，總長 ≤ 200 字。
- TradeDesc 長度 ≤ 200 字。

---

## 為什麼這些限制存在

ECPay 後台是直接以字串比對與長度檢查驗證請求，**任何超長、含全形字、含時區資訊（如 `+08:00`）的字串都會被拒**。
SDK 端的 validator（`ecpay_aio_nodejs/lib/ecpay_payment/helper/utils.js`）會在送出前丟例外，
所以錯誤通常**不會**到綠界伺服器才回，會直接在 `aio_check_out_all` 當下拋出。

判斷錯誤是否屬於格式問題：
- 看錯誤訊息是否為 `Wrong format of param XXX or length exceeded` → 屬於 SDK 端 validator 攔截。
- 若是 ECPay 伺服器回傳的 `RtnCode != 1` → 屬於商店設定或交易邏輯問題，不在本段範圍。

---

## 環境設定

目前 `pay-ecpay.service.js` 採用**寫死在程式內**的測試帳號（`OperationMode: 'Test'`），上線前必須改用環境變數：

| 變數名 | 用途 |
| --- | --- |
| `ECPAY_MERCHANT_ID` | 綠界商店代號 |
| `ECPAY_HASH_KEY` | 綠界 HashKey |
| `ECPAY_HASH_IV` | 綠界 HashIV |
| `ECPAY_OPERATION_MODE` | `Test` / `Production` |
| `ECPAY_RETURN_HOST` | Cloud Run / 自訂網域，用以組 ReturnURL 與 ClientBackURL |

部署目標為 GCP `spacein-493210` 專案，目前的 `cloud_return_url` 是寫死的 Cloud Run URL，整理時請改用環境變數，避免每次重新部署都要改原始碼。

---

## 付款流程概觀

1. 前端打 `getPaySelectPageHtml(payment, userId)` → 後端產 ECPay 表單 HTML。
2. 使用者在綠界完成付款。
3. ECPay 以 server-to-server POST 打 `ReturnURL`（必須回應 `1|OK`，否則綠界會重試）。
4. 在 `ReturnURL` handler 內呼叫 `addPaymentHistory()` 與 `addUserToPayment()`，**這兩步必須先驗證綠界回傳簽章（CheckMacValue）成功才執行**，否則會被偽造付款。
5. ECPay 將使用者瀏覽器導回 `ClientBackURL`，前端顯示成功頁。

---

## 修改檢核清單

修改 `pay-ecpay.service.js` 或相關 callback 時，請依序確認：

- [ ] `MerchantTradeDate` 格式為 `yyyy/MM/dd HH:mm:ss` 且為台北時區。
- [ ] `MerchantTradeNo` 長度 ≤ 20、僅含英數字。
- [ ] `TotalAmount` 為整數。
- [ ] `ReturnURL` 與 `ClientBackURL` 可由 ECPay 伺服器對外存取（不可用 `localhost`）。
- [ ] Callback handler 已驗證 `CheckMacValue`。
- [ ] 付款成功才寫入 `PaymentHistory`、更新 `UserToPayment`。
- [ ] `planTimeType` 的所有分支（`1day`/`2day`/`7day`/`month`/`season`/`year`）皆需正確計算到期日。
