----
name: 教室開放限制（擁有者預設資料 / 每周不開放時段 / 每天開放時段）
description: >
  修改或新增任何與「擁有者預設資料（Owner 表）」「教室開放限制欄位（地址、電話、
  每周不開放時段、每天開放時段）」「預約流程行事曆不開放提醒」「時鐘頁開放時段提醒與卡控」
  相關的前後端功能時，必須參考此檔案。
  關鍵字：Owner 表、擁有者預設資料、weeklyCloseDays、openStartTime、openEndTime、
  每周不開放、每天開放時段、行事曆休、room-open-limit、教室地址、教室電話、
  帶入擁有者預設、booking 卡控。
----

## 功能總覽

擁有者可在 [帳號頁面] 設定一組「預設資料」（Owner 表），
教室新增時自動帶入該預設，並可逐教室調整（Room 表）；
預約者在預約流程中，行事曆與時鐘頁會依「綁定擁有者之所有教室」的開放限制
給予文字提醒並卡控。

資料流：
```
帳號頁(擁有者設定預設) → Owner 表
教室新增(自動帶入預設 / 按鈕重新帶入) → Room 表
預約日期頁 / 時鐘頁 → 讀 Room 表 → 提醒 + 卡控
```

## 欄位規格（Owner 預設 與 Room 共用同一組欄位）

| 欄位 | 型別 | 說明 |
|------|------|------|
| `address` | string | 地址 |
| `phone` | string | 電話 |
| `weeklyCloseDays` | number[] | 每周不開放時段，星期數字陣列 **0=周日 ~ 6=周六，對齊 `Date.getDay()`**，如 `[0, 6]` 即六日不開放 |
| `openStartTime` | string | 每天開放時段 開始，格式 `"09:00"` |
| `openEndTime` | string | 每天開放時段 結束，格式 `"18:00"` |

為什麼共用同一組欄位：教室的欄位就是從擁有者預設「複製帶入」再各自調整，
兩邊形狀一致才能直接 spread 帶入、共用同一組判斷工具，避免兩套邏輯漂移。

### 舊資料相容原則（重要）
既有 Room 資料沒有這些欄位。所有判斷一律採「**未設定視為不限制**」：
- `weeklyCloseDays` 缺省 → 視為每天都開放。
- `openStartTime` / `openEndTime` 任一缺省或格式錯誤 → 視為不卡控時段。
這讓舊教室在不補資料的情況下行為完全不變。

## 共用工具（前端單一事實來源）

`frontend/src/app/common/room-site/models/room-open-limit.ts`
- `WEEKDAY_NAMES`：星期顯示名稱，index 對齊 `Date.getDay()`。
- `createWeeklyDayOptions()`：checkbox 選項（顯示順序 週一~週日，value 仍為 0~6）。
- `isCloseOnWeekday(limit, weekday)`：該星期是否不開放。
- `getFullCloseWeekdays(limitList)`：**所有**教室皆不開放之星期（行事曆整日「休」）。
- `timeToMinutes("HH:mm")`：時間字串轉分鐘，無效回傳 NaN。
- `isTimeRangeInOpen(limit, start, end)`：選擇時段是否落在開放時段內。
- `getOpenLimitText(limit)`：提醒文字，如「每周不開放: 週六、週日 ; 每天開放 09:00~18:00」。

任何新頁面要判斷「開放/不開放」，一律 import 這個模組，不要在頁面內重寫判斷。

## 後端

- `backend/src/models/owner.model.js`：`Owner` collection，**doc id 直接使用 ownerId**（擁有者 user id），
  查詢免搜尋、`upsert`（`set(..., {merge:true})`）天然去重。
- `backend/src/services/owner.service.js`：`getOwnerProfile` / `saveOwnerProfile`。
- API（`backend/src/index.js`）：
  - `GET  /api/account/owner/profile/:ownerId` 取得擁有者預設資料
  - `POST /api/account/owner/profile/save` 儲存（body: `{owner: {ownerId, ...}}`，缺 ownerId 回 400）
  - **路由順序陷阱**：必須註冊在 `GET /api/account/owner/:email` 之前敘述性存在（實際依 segment 數不衝突，但保持在其前方以免日後誤動）。
- Room 新增（`room.service.js` `add`）會補上五個欄位的空預設值，讓資料形狀一致；
  update 直接整包 spread 寫入。

## 前端頁面

- 帳號頁 `auth-route/components/account-page`：
  以 `HomeService.getUserRole()` 判斷含 `owner` 角色才顯示「擁有者預設資料」區塊；儲存前卡控開放時段（需成對填寫、開始早於結束）。
- 教室表單 `manager-room/components/content/search-room-content`：
  `model === 'add'` 時自動 `importOwnerProfile(false)` 帶入預設；
  「重新帶入擁有者預設」按鈕呼叫 `importOwnerProfile(true)`（手動觸發才彈提示）。
- 預約教室清單快取：`BookingService.loadOwnerRoomList(userId)`
  （走既有 `GET /api/booking/room/userId/:userId`，後端已處理 booker→owner 對應），
  日期頁與時鐘頁共用，避免重複打 API。
- 日期頁 `booking-date-page`：行事曆傳入 `[weeklyCloseDays]="fullCloseWeekdays"`
  （所有教室交集才整日標「休」），下方顯示逐教室開放限制與所選日期不開放教室警示；
  全部教室皆不開放時 `nextStep()` 卡控。
- 行事曆 `common/time/component/calendar-picker`：
  `@Input() weeklyCloseDays`（預設空陣列，**其他使用此元件的頁面行為不變**），
  該日顯示「休」、變淡、點擊 alert 卡控。
- 時鐘頁 `booking-clock-page`：顯示所選日期逐教室開放時段提醒；
  `checkValidTime()` 卡控「所選時段需落在至少一間該日有開放教室的開放時段內」。

## 樣式一致性規範

- 區塊底色 `#FBE0FF`、圓角 `20px`、主題深紫 `#661983`，
  比照帳號頁 `.row` 與全站區塊風格；提醒區塊 class 統一命名 `.open-limit-info`。
- `input[type="checkbox"]` / `input[type="time"]` 的全站樣式定義於 `frontend/src/styles.scss`
  （checkbox 重置全域 input 圓角框、`accent-color: #661983`），新頁面直接使用即可，不要在元件內重複覆寫。

## 驗證方式

- `cd frontend && npx tsc --noEmit`：僅允許既有基準線錯誤（cypress 與 spec 型別衝突）。
- `cd frontend && npx ng build --configuration production` 需成功。
- 後端以 `node --check` 檢查語法；Firestore 無 schema，欄位以程式端預設值保證形狀。
