
export class Room {
    
    id = "";
    name = "";
    ownerId = "";
    ownerMail = "";
    bookingCount = 0;

    constructor(room: any) {
        this.id = room["id"];
        this.name = room["name"];
        this.ownerId = room["ownerId"];
        this.ownerMail = room["ownerMail"];
    }
}
