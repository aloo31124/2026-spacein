
export class Room {

    id = "";
    name = "";
    ownerId = "";
    ownerMail = "";
    bookingCount = 0;

    // 教室開放限制欄位 (由擁有者預設帶入, 可各教室調整)
    address = "";
    phone = "";
    weeklyCloseDays: number[] = [];
    openStartTime = "";
    openEndTime = "";

    constructor(room: any) {
        this.id = room["id"];
        this.name = room["name"];
        this.ownerId = room["ownerId"];
        this.ownerMail = room["ownerMail"];
        this.address = room["address"] ?? "";
        this.phone = room["phone"] ?? "";
        this.weeklyCloseDays = room["weeklyCloseDays"] ?? [];
        this.openStartTime = room["openStartTime"] ?? "";
        this.openEndTime = room["openEndTime"] ?? "";
    }
}
