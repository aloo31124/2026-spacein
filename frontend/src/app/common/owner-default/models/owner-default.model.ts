
/*
 * 擁有者預設資料 / 教室開放資訊 共用欄位
 * (地址、電話、每周不開放星期、每天開放時段)
 * 欄位名稱前後端與 Owner表/教室表 一致, 帶入時可直接整組複製
 */
export class OwnerDefault {

    address = "";                    // 地址
    phone = "";                      // 電話
    closedWeekdays: number[] = [];   // 每周不開放星期 (0=星期日 ~ 6=星期六)
    openStartTime = "09:00";         // 每天開放起始時間
    openEndTime = "18:00";           // 每天開放結束時間

    constructor(data?: any) {
        if (!data) return;
        this.address = data["address"] ?? "";
        this.phone = data["phone"] ?? "";
        this.closedWeekdays = Array.isArray(data["closedWeekdays"]) ? [...data["closedWeekdays"]] : [];
        this.openStartTime = data["openStartTime"] || "09:00";
        this.openEndTime = data["openEndTime"] || "18:00";
    }
}
