----
name: 擁有者預設資料與教室開放時段卡控
description: >
  修改或新增「擁有者預設資料（預設地址/電話/每周不開放星期/每天開放時段）」、
  「教室開放資訊欄位」、「空間預約之教室不開放時段卡控」、「預約流程卡控提醒」相關前後端功能時，必須參考此文件。
  涵蓋 Owner 表結構、共用表單元件 app-owner-default-form、預約存檔前卡控規則與錯誤回傳格式、
  行事曆/時鐘頁即時提醒機制與共用規則 util。
  關鍵字：擁有者預設、Owner表、closedWeekdays、openStartTime、openEndTime、
  每周不開放、每天開放時段、預約卡控、checkRoomOpenRule、owner-default-form、帶入擁有者預設、
  卡控提醒、room-open-rule.util、不開放教室提醒、openRuleRoomList。
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
- 前端共用：`frontend/src/app/common/owner-default/`（`OwnerDefault` model ＋ `app-owner-default-form` 元件）；
  外層粉紅圓角卡片樣式為全域 class `.owner-default-card`（定義於 `styles.scss`），
  帳號頁與教室編輯頁共用同一份，修改卡片外觀只改全域一處；地址輸入框旁的 map icon
  也由此表單統一提供，地址有值時另開 Google Maps 搜尋視窗，空值時顯示停用狀態
- 地址／電話動作 icon：`frontend/src/app/common/contact-action/` 的 `app-contact-action-icon`；
  map 使用 Google Maps Search URL（地址須 `encodeURIComponent`）並加上 `noopener noreferrer`，
  phone 使用 `tel:` 交由裝置通話介面處理；未設定資料時不可產生空連結
- 前端使用處：帳號頁 `account-page`（labelPrefix="預設"、僅 owner 角色顯示）、
  教室表單 `search-room-content`（新增時自動帶入、「重新帶入擁有者預設」按鈕）
- 預約頁顯示（地址/電話）：[空間預約] `booking-check-form-page`（選擇教室後顯示該教室 地址/電話，
  未設定顯示「未設定」）、[已預約] `review-booking-form`（依預約紀錄 `roomId` 走既有
  `GET /api/booking/room/userId/:userId` 查教室後顯示；顯示為輔助資訊，取得失敗靜默、不擋取消借用流程）；
  兩頁各自 component scss 皆以 `.row-room-info` class 呈現，地址與電話旁分別提供深紫色 map／phone icon
  。聯絡文字需以 `flex: 1 1 auto` 占用 icon 以外的剩餘空間，搭配 `min-width: 0` 與
  `overflow-wrap: anywhere` 處理無空白長字串；icon 固定不可壓縮，避免地址或電話過長時撐破版面

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

## [教室時段卡控] 前端即時提醒機制

預約流程在後端卡控「之前」就即時告知預約者哪些教室不可選，共三處呈現：

1. **[空間預約] 行事曆頁** `booking-date-page`：點選日期後，行事曆下方即時顯示
   「{日期}（{星期}）下列教室不開放」＋教室名稱膠囊（命中 `closedWeekdays`）。
2. **[空間預約] 時鐘頁** `booking-clock-page`：每次選時間（點數字/拖指針/切AM-PM/切起訖）
   即時列出卡控教室與原因；整天不開放優先提醒，否則提醒「開放時段 HH:mm~HH:mm」。
3. **[空間管理] 教室管理列表** `search-room`：每列顯示「不開放日期」（如 星期日、星期六，無設定顯示「無」）
   與「開放時段」（如 09:00 ~ 18:00，無設定顯示「未設定」）。

### 共用規則 util（修改卡控規則時，前後端要一起改）

`frontend/src/app/common/owner-default/utils/room-open-rule.util.ts` 為純函式，
規則必須與後端 `checkRoomOpenRule` 完全一致（含日期手動解析、HH:mm 補零比較）：
`isRoomClosedOnDate`、`isTimeOutsideOpenRange`、`formatClosedWeekdays`、`formatOpenTimeRange`、
`parseWeekdayFromDateStr`、`padTime`、`WEEKDAY_NAMES`。

### 資料流與效能設計（背後原因，修改時務必保留）

- **一次載入、記憶體檢查**：`BookingService.loadOpenRuleRoomList(userId)` 走既有
  `GET /api/booking/room/userId/:userId`（後端 `Room.search` 回傳完整文件，本就含開放資訊欄位，
  且已處理 booker→owner 身分換算），結果存 `bookingService.openRuleRoomList`。
  之後每次點日期/選時間的檢查皆為前端純記憶體過濾，即時反應、不打 API。
- **每次進頁重抓保鮮**：行事曆頁與時鐘頁各自於 `ngOnInit` 重新載入一次，
  教室的 `closedWeekdays`/開放時段被更新後，下次進頁提醒即正確；每頁僅 1 個請求。
- **提醒為輔助、後端為準**：載入失敗不擋預約流程（subscribe error 靜默），
  最終仍由後端 `checkRoomOpenRule` 於存檔前卡控。
- **避免 template 重複運算**：提醒列表（`closedRoomList`、`timeRuleHintList`）於事件發生時
  重算一次存屬性；教室管理列表的顯示文字（`closedWeekdaysText`、`openTimeText`）於搜尋回傳時
  一次 map 算好，不在 `*ngFor` 內呼叫函式。
- **提醒卡片樣式為全域 class** `.room-open-hint`（定義於 `styles.scss`，緊鄰 `.owner-default-card`），
  行事曆頁與時鐘頁共用同一份。
- 前端 `Room` model（`common/room-site/models/room.model.ts`）已含
  `address`/`phone`/`closedWeekdays`/`openStartTime`/`openEndTime` 欄位，缺值時補空陣列/空字串。
