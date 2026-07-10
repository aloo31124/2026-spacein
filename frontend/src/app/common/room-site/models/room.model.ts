
export class Room {

    id = "";
    name = "";
    ownerId = "";
    ownerMail = "";
    bookingCount = 0;

    // 教室開放資訊 (地址/電話/每周不開放星期/每天開放時段), 供 預約流程 顯示與即時卡控提醒
    address = "";                    // 地址
    phone = "";                      // 電話
    closedWeekdays: number[] = [];   // 每周不開放星期 (0=星期日 ~ 6=星期六)
    openStartTime = "";              // 每天開放起始時間 HH:mm
    openEndTime = "";                // 每天開放結束時間 HH:mm

    constructor(room: any) {
        this.id = room["id"];
        this.name = room["name"];
        this.ownerId = room["ownerId"];
        this.ownerMail = room["ownerMail"];
        this.address = room["address"] ?? "";
        this.phone = room["phone"] ?? "";
        this.closedWeekdays = Array.isArray(room["closedWeekdays"]) ? [...room["closedWeekdays"]] : [];
        this.openStartTime = room["openStartTime"] || "";
        this.openEndTime = room["openEndTime"] || "";
    }
}
