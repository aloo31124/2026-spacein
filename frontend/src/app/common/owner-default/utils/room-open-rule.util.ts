
/*
 * 教室開放時段 卡控規則 共用工具 (純函式, 無相依, 可被任何元件/服務引用)
 * 規則必須與後端 booking.service.js checkRoomOpenRule 完全一致:
 *   1. 每周不開放星期 closedWeekdays (0=星期日 ~ 6=星期六)
 *   2. 每天開放時段 openStartTime ~ openEndTime
 * 前端於 行事曆/時鐘 頁用此工具做「即時提醒」, 後端存檔前仍做最終卡控。
 */

// 具備 教室開放資訊欄位 的物件 (Room model 或 API 原始資料皆可)
export interface RoomOpenRule {
    name?: string;
    closedWeekdays?: number[];
    openStartTime?: string;
    openEndTime?: string;
}

// 星期顯示名稱, 索引對應 Date.getDay() (0=星期日 ~ 6=星期六), 與後端一致
export const WEEKDAY_NAMES = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

/*
 * 由 YYYY-M-D 日期字串取得星期 (0=星期日 ~ 6=星期六)
 * 手動解析避免 new Date("2026-7-8") 字串解析的 UTC/本地時區差異 (與後端一致)
 */
export function parseWeekdayFromDateStr(dateStr: string): number {
    const [year, month, day] = String(dateStr).split('-').map(Number);
    return new Date(year, month - 1, day).getDay();
}

/* 時間字串補零 (9:00 -> 09:00), 供 HH:mm 字串比較 (與後端一致) */
export function padTime(time: string): string {
    const [hour = "", minute = ""] = String(time).split(':');
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
}

/* 該教室 於 該日期(YYYY-M-D) 是否為 每周不開放星期 */
export function isRoomClosedOnDate(room: RoomOpenRule, dateStr: string): boolean {
    if (!dateStr || !Array.isArray(room?.closedWeekdays)) {
        return false;
    }
    return room.closedWeekdays.includes(parseWeekdayFromDateStr(dateStr));
}

/* 該教室 於 該起訖時間(HH:mm) 是否超出 每天開放時段 (教室未設定開放時段則不卡控) */
export function isTimeOutsideOpenRange(room: RoomOpenRule, startTime: string, endTime: string): boolean {
    if (!room?.openStartTime || !room?.openEndTime) {
        return false;
    }
    return padTime(startTime) < padTime(room.openStartTime)
        || padTime(room.openEndTime) < padTime(endTime);
}

/* 每周不開放星期 顯示文字, 如 "星期日、星期六"; 未設定回傳 "無" */
export function formatClosedWeekdays(closedWeekdays?: number[]): string {
    if (!Array.isArray(closedWeekdays) || closedWeekdays.length === 0) {
        return "無";
    }
    const text = [...closedWeekdays]
        .sort((a, b) => a - b)
        .map(weekday => WEEKDAY_NAMES[weekday] ?? "")
        .filter(name => name !== "")
        .join("、");
    return text || "無";
}

/* 每天開放時段 顯示文字, 如 "09:00 ~ 18:00"; 未設定回傳 "未設定" */
export function formatOpenTimeRange(room: RoomOpenRule): string {
    if (!room?.openStartTime || !room?.openEndTime) {
        return "未設定";
    }
    return room.openStartTime + " ~ " + room.openEndTime;
}
