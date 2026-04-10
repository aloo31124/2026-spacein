
export class RoomSiteIsBooking {
    id = "";
    roomId = "";
    siteName = "";
    roomName = "";
    isBooking = false;

    constructor(roomSiteIsBooking: any) {
        this.id = roomSiteIsBooking["id"];
        this.roomId = roomSiteIsBooking["roomId"];
        this.siteName = roomSiteIsBooking["name"];
        this.roomName = roomSiteIsBooking["roomName"];
        this.isBooking = roomSiteIsBooking["isBooking"];
    }

}