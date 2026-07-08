----
name: 擁有者預設資料與教室開放時段卡控
description: >
  修改或新增「擁有者預設資料（預設地址/電話/每周不開放星期/每天開放時段）」、
  「教室開放資訊欄位」、「空間預約之教室不開放時段卡控」相關前後端功能時，必須參考此文件。
  涵蓋 Owner 表結構、共用表單元件 app-owner-default-form、預約存檔前卡控規則與錯誤回傳格式。
  關鍵字：擁有者預設、Owner表、closedWeekdays、openStartTime、openEndTime、
  每周不開放、每天開放時段、預約卡控、checkRoomOpenRule、owner-default-form、帶入擁有者預設。
----

## 功能總覽

擁有者可在帳號頁面設定一組「預設資料」；教室（Room）持有同名欄位，
新增教室時自動帶入預設值；預約者送出預約時，後端依教室設定卡控不開放時段。

## 資料結構（欄位名稱前後端、Owner 表與教室表完全一致）

欄位名稱刻意共用，讓「帶入擁有者預設」只需整組物件複製（`{...ownerDefault}`），
不需欄位對應轉換，未來加欄位也只要改 `OwnerDefault` model 一處。

| 欄位 | 型別 | 說明 |
|------|------|------|
| `address` | string | 地址 |
| `phone` | string | 電話 |
| `closedWeekdays` | number[] | 每周不開放星期，`0=星期日 ~ 6=星期六`（對應 `Date.getDay()`） |
| `openStartTime` | string | 每天開放起始時間 `HH:mm`，如 `09:00` |
| `openEndTime` | string | 每天開放結束時間 `HH:mm`，如 `18:00` |

- **Owner 表**（Firestore collection `Owner`）：以 `ownerId` 作為文件 id，一位擁有者僅一筆，
  存檔用 `set(..., {merge:true})` 達成 upsert。
- **教室表**（`Room`）：同名欄位直接存於教室文件，新增時未帶入會補預設空值。

## 關鍵檔案

- 後端：`backend/src/models/owner.model.js`、`backend/src/services/owner.service.js`、
  `backend/src/services/booking.service.js`（卡控）、`backend/src/services/room.service.js`（欄位預設值）
- API 路由（`backend/src/index.js`）：
  `GET/POST /api/account/owner/default/:ownerId`（注意需排在 `/api/account/owner/:email` 之前的區塊，避免路由誤匹配）
- 前端共用：`frontend/src/app/common/owner-default/`（`OwnerDefault` model ＋ `app-owner-default-form` 元件）
- 前端使用處：帳號頁 `account-page`（labelPrefix="預設"、僅 owner 角色顯示）、
  教室表單 `search-room-content`（新增時自動帶入、「重新帶入擁有者預設」按鈕）

## 預約卡控規則（booking.service.js `checkRoomOpenRule`）

存入 Booking 前依 `booking.roomId` 查教室設定，違規即拒絕：

1. **每周不開放**：預約日期之星期落在 `closedWeekdays` → 拒絕。
2. **每天開放時段**：`startTime < openStartTime` 或 `endTime > openEndTime` → 拒絕。
3. 查無教室或教室未設定 → 不卡控（維持原有預約行為，避免舊資料無法預約）。

實作眉角（背後原因，修改時務必保留）：

- **日期手動解析**：預約日期格式為 `YYYY-M-D`（月日未補零），用 `new Date(y, m-1, d)`
  拆解計算星期，不可 `new Date("2026-7-8")` —— 字串解析在不同環境會有 UTC/本地時區差異，
  可能算出前一天的星期。
- **時間補零比較**：`HH:mm` 字串比較前先 `padTime`（`9:00` → `09:00`），
  否則字典序比較會錯（`"9:00" > "18:00"`）。
- **錯誤格式**：卡控失敗丟出 `Error` 並掛 `error.status = 400`，訊息必須含
  教室名稱＋日期（含星期）或時段，例：
  `預約失敗：教室「大教室A」於 2026-7-11（星期六）不開放。`
  controller 以 `error.status || 500` 決定 HTTP 狀態，回傳 `{result, error: message}`；
  前端從 `error.error.error` 取出訊息直接 alert 給預約者。
