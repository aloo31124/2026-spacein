/*
 * [教室開放限制] 共用工具
 * 擁有者預設資料 (Owner 表) 與 教室 (Room 表) 共用同一組欄位:
 *  - address          地址
 *  - phone            電話
 *  - weeklyCloseDays  每周不開放時段, 星期數字陣列 (0=周日 ~ 6=周六), 對齊 Date.getDay()
 *  - openStartTime    每天開放時段 開始, 格式 "09:00"
 *  - openEndTime      每天開放時段 結束, 格式 "18:00"
 * 供 帳號頁(擁有者預設)、教室表單、預約行事曆提醒、時鐘卡控 共用,
 * 避免各頁面對「不開放」的判斷邏輯不一致。
 */

/* 星期顯示名稱, index 對齊 Date.getDay() */
export const WEEKDAY_NAMES = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];

/* 每周不開放時段 checkbox 選項 */
export interface WeeklyDayOption {
    label: string;
    value: number;
    checked: boolean;
}

/* 產生 每周不開放時段 checkbox 選項 (週一 ~ 週日 排序, 符合台灣使用習慣) */
export function createWeeklyDayOptions(): WeeklyDayOption[] {
    return [1, 2, 3, 4, 5, 6, 0].map(value => ({
        label: WEEKDAY_NAMES[value],
        value,
        checked: false,
    }));
}

/* 教室開放限制 欄位介面 (Owner 預設 / Room 皆適用) */
export interface RoomOpenLimit {
    address?: string;
    phone?: string;
    weeklyCloseDays?: number[];
    openStartTime?: string;
    openEndTime?: string;
}

/* 判斷 該教室 於該星期(0=周日) 是否不開放; 舊資料無設定視為開放 */
export function isCloseOnWeekday(limit: RoomOpenLimit, weekday: number): boolean {
    return (limit.weeklyCloseDays ?? []).includes(weekday);
}

/* 取得 所有教室皆不開放 之星期集合, 用於行事曆整日標示「休」 */
export function getFullCloseWeekdays(limitList: RoomOpenLimit[]): number[] {
    if (limitList.length === 0) {
        return [];
    }
    return [0, 1, 2, 3, 4, 5, 6].filter(weekday =>
        limitList.every(limit => isCloseOnWeekday(limit, weekday))
    );
}

/* "HH:mm" 轉 分鐘數, 空字串或格式錯誤回傳 NaN */
export function timeToMinutes(time: string): number {
    if (!time || !time.includes(':')) {
        return NaN;
    }
    const [hour, min] = time.split(':').map(Number);
    return hour * 60 + min;
}

/* 判斷 選擇時段 是否落在 該教室每天開放時段內; 舊資料未設定開放時段視為不限制 */
export function isTimeRangeInOpen(limit: RoomOpenLimit, startTime: string, endTime: string): boolean {
    const openStart = timeToMinutes(limit.openStartTime ?? '');
    const openEnd = timeToMinutes(limit.openEndTime ?? '');
    if (isNaN(openStart) || isNaN(openEnd)) {
        return true;
    }
    const selectStart = timeToMinutes(startTime);
    const selectEnd = timeToMinutes(endTime);
    return openStart <= selectStart && selectEnd <= openEnd;
}

/* 教室開放限制 說明文字, 如「每周不開放: 週六、週日; 每天開放 09:00~18:00」 */
export function getOpenLimitText(limit: RoomOpenLimit): string {
    const textList: string[] = [];
    const closeDays = (limit.weeklyCloseDays ?? []);
    if (closeDays.length > 0) {
        // 依 週一~週日 排序顯示
        const sorted = [1, 2, 3, 4, 5, 6, 0].filter(day => closeDays.includes(day));
        textList.push('每周不開放: ' + sorted.map(day => WEEKDAY_NAMES[day]).join('、'));
    }
    if (limit.openStartTime && limit.openEndTime) {
        textList.push('每天開放 ' + limit.openStartTime + '~' + limit.openEndTime);
    }
    return textList.length > 0 ? textList.join(' ; ') : '無開放限制';
}
