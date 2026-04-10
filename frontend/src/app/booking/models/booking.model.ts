export class Booking {
    id = "";
    userId = "";
    mail = "";
    startDate = "";
    endDate = "";
    startTime = "";
    endTime = "";
    bookingType = "";
    roomId = "";
    roomName = ""
    siteId = "";
    siteName = ""

    constructor(
        id: string,
        userId: string,
        mail: string,
        startDate: string,
        endDate: string,
        startTime: string,
        endTime: string,
        bookingType: string,
        roomId: string,
        roomName: string,
        siteId: string,
        siteName: string
    ){
        this.id = id;
        this.userId = userId;
        this.mail = mail;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.bookingType = bookingType;
        this.roomId = roomId;
        this.roomName = roomName;
        this.siteId = siteId;
        this.siteName = siteName;
    }

}