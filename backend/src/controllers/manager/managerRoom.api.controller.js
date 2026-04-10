const userService = require('../../services/user.service');
const bookingService = require('../../services/booking.service')
const roomService = require('../../services/room.service');
const roomToSiteService = require('../../services/roomToSite.service');


/* [空間管理] 搜尋 [預約紀錄] */
exports.searchBooking = async (req, res) => {
    try {
        console.log(" [searchBooking] api 開始 req.body : ", req.body);
        const { booking } = req.body;
        const { ownerId } = req.params;
        const result = await bookingService.joinBookingRoomOwner(booking, ownerId);
        console.log(" [searchBooking] api 結束 result : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error, result: error.message });
    }
};

/* [空間管理] 預約者booker 搜尋 */
exports.searchbookerUser = async (req, res) => {
    try {
        console.log(" [searchbookerUser] api 開始 req.body : ", req.body);
        const { user } = req.body;
        const { ownerId } = req.params;
        const result = await userService.joinBookerOwnerInfo(user, ownerId);
        console.log(" [searchbookerUser] api 結束 result : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: '500', error: error.message });
    }
};

/* [空間管理] [教室] 搜尋, 依照 ownerId 擁有者id  */
exports.searchRoom = async (req, res) => {
    try {
        console.log(" [searchRoom] api 開始 req.body : ", req.body);
        const { room } = req.body;
        const { ownerId } = req.params;
        const result = await roomService.searchRoomList(room, ownerId);
        console.log(" [searchRoom] api 結束 req.body : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [searchRoom] api 500', error: error.message });
    }
}

/* [空間管理] [教室] 匯出, 依照 ownerId 擁有者id  */
exports.exportRoom = async (req, res) => {
    try {
        console.log(" [exportRoom] api 開始 req.body : ", req.body);
        const { ownerId } = req.params;
        const result = await roomService.searchRoomList({}, ownerId);
        console.log(" [exportRoom] api 結束 req.body : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [exportRoom] api 500', error: error.message });
    }
}

/* [空間管理] [教室] 新增 */
exports.addRoom = async (req, res) => {
    try {
        console.log(" [addRoom] api 開始 req.body : ", req.body);
        const { room } = req.body;
        const { ownerId } = req.params;
        const result = await roomService.add(room, ownerId);
        console.log(" [addRoom] api 結束 req.body : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [addRoom] api 500', error: error.message });
    }
}

/* [空間管理] [教室] 編輯 */
exports.updateRoom = async (req, res) => {
    try {
        console.log(" [updateRoom] api 開始 req.body : ", req.body);
        const { room } = req.body;
        const { ownerId } = req.params;
        const result = await roomService.update(room, ownerId);
        console.log(" [updateRoom] api 結束 req.body : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [update] api 500', error: error.message });
    }
}

/* [空間管理] [教室] 刪除 */
exports.deleteRoom = async (req, res) => {
    try {
        console.log(" [deleteRoom] api 開始 req.body : ", req.body);
        const { ownerId, id } = req.params;
        const result = await roomService.delete(id);
        console.log(" [deleteRoom] api 結束 req.body : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [deleteRoom] api 500', error: error.message });
    }
}


/* [空間管理] [座位] 搜尋 */
exports.searchSiteJoinRoomInfo = async (req, res) => {
    try {
        const { roomToSite } = req.body;
        const { ownerId } = req.params;
        const result = await roomToSiteService.joinSiteRoomUser(roomToSite, ownerId);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error, result: error.message });
    }
}


/* [空間管理] [教室座位] 新增 */
exports.addSite = async (req, res) => {
    try {
        console.log(" [addSite] api 開始 req.body : ", req.body);
        const { roomToSite } = req.body;
        const { ownerId } = req.params;
        const result = await roomToSiteService.add(roomToSite, ownerId);
        console.log(" [addSite] api 結束 req.body : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [addSite] api 500', error: error.message });
    }
}


/* [空間管理] [教室座位] 更新 */
exports.updateSite = async (req, res) => {
    try {
        console.log(" [updateSite] api 開始 req.body : ", req.body);
        const { roomToSite } = req.body;
        const { ownerId } = req.params;
        const result = await roomToSiteService.update(roomToSite, ownerId);
        console.log(" [updateSite] api 結束 req.body : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [updateSite] api 500 : ', error: error.message });
    }
}


/* [空間管理] [教室座位] 刪除 */
exports.deleteSite = async (req, res) => {
    try {
        console.log(" [deleteSite] api 開始 req.params : ", req.params);
        const { id, ownerId } = req.params;
        const result = await roomToSiteService.delete(id);
        console.log(" [deleteSite] api 結束 req.body : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [deleteSite] api 500 : ', error: error.message });
    }
}


/* [空間管理] [教室座位] 匯入, 教室,座位, ownerId 綁定 */
exports.importRoomJoinSiteByOwnerId = async (req, res) => {
    try {
        console.log(" [importRoomJoinSiteByOwnerId] api 開始 req.params, req.body : ", req.params, req.body);
        const { roomToSiteList } = req.body;
        const { ownerId } = req.params;
        const result = await roomToSiteService.importRoomSite(ownerId, roomToSiteList);
        console.log(" [importRoomJoinSiteByOwnerId] api 結束 result : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [importRoomJoinSiteByOwnerId] api 500', error: error.message });
    }
}



