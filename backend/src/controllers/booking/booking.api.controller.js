const bookingService = require('../../services/booking.service');
const room = require('../../services/room.service');
const roomToSite = require('../../services/roomToSite.service');
const userToOwnerService = require('../../services/userToOwner.service');
const userToRoleService = require('../../services/userToRole.service');

exports.getAllBookingList = async (req, res) => {
    try {
        console.log("[getAllBookingList] api 開始 ");
        res.status(200).json(await bookingService.getAllBookingList());
    } catch (error) {
        console.error("[getAllBookingList] api Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
}

/* 取得所有教室完整資訊, 
    用於匯出, 取 dialog列表
*/
exports.getAllRoom = async (req, res) => {
    try {
        console.log("[getAllRoom] api 開始 : ");
        const result = await room.getAllRoomList();
        console.log("[getAllRoom] api 成功, result : ", result);
        res.status(200).json(result);
    } catch (error) {
        console.error("[getAllRoom] api Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
}

/**
 * 依照當前擁有者搜尋所有教室
 */
exports.getRoomByUserId = async (req, res) => {
    try {
        console.log("[getRoomByUserId] api 開始  ");
        const { userId } = req.params;
        // 確認使用者身分
        const userToRoleList = await userToRoleService.getUserRoleByUserId(userId);

        let ownerId = "";
        // 若為 擁有者owner 直接存 userId booker
        if(userToRoleList.some(u2r => u2r.role === "owner")) {
            ownerId = userId;
        }
        // 若為 預約者booker, 取得擁有者owner資訊 
        else if(userToRoleList.some(u2r => u2r.role === "booker")) {
            const userToOwner = (await userToOwnerService.findOwnerByUserId(userId))[0];
            ownerId = userToOwner.ownerId
        } 
        else {
            console.error("[getRoomByUserId] 搜尋失敗 無法判斷身分");
            res.status(500).json({ result: "[getRoomByUserId] 搜尋失敗 無法判斷身分" });
        }

        const result = await room.searchRoomList({}, ownerId);
        console.log("[getRoomByUserId] api 成功 : ", result);
        res.status(200).json(result);
    } catch (error) {
        console.error("[getRoomByUserId] api Error:", error);
        res.status(500).json({ result: error.message });
    }
}

exports.getAllSite = async (req, res) => {
    try {
        console.log("[getAllSite] api 開始 : ");
        const result = await roomToSite.getAllRoomtositeList();
        console.log("[getAllSite] api 成功, result : ", result);
        res.status(200).json(result);
    } catch (error) {
        console.error("[getAllSite] api Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
}

exports.postBooking = async (req, res) => {
    try {
        console.log("[postBooking] api 開始, req.body : ", req.body);
        const result = await bookingService.addBooking(req.body.booking);
        console.log("[postBooking] api 成功, result : ", result);
        res.status(200).json(result);
    } catch (error) {
        console.error("[postBooking] api Error:", error);
        // 卡控類錯誤 (教室不開放時段) 帶有 status 400, 其餘視為 500
        const status = error.status || 500;
        res.status(status).json({ result: String(status), error: error.message });
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        console.log("[deleteBooking] api 開始");
        const { bookingId } = req.params;
        const result = await bookingService.deleteBooking(bookingId);
        console.log("[deleteBooking] api 成功, result : ", result);
        res.status(200).json(result);
    } catch (error) {
        console.error("[deleteBooking] api Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
}


/*
 * 回傳所有 教室,座位 資訊, 並有 booking 時段判斷, 若已被預約, 則註記 isbooking: true
 *  firestore 操作 待抽離至 RoomToSite model
 */
exports.getRoomToSiteByDate = async (req, res) => {
    try {
        console.log("[getRoomToSiteByDate] api 開始, req.params : ", req.params);
        const {startDate="1991-1-1", startTime="00:00", endTime="00:00"} = req.params;
        const result = await roomToSite.getRoomSiteByDate(startDate, startTime, endTime);
        console.log("[getRoomToSiteByDate] api 成功, result : ", result);
        res.status(200).json(result);
    } catch (error) {
        console.error("[getRoomToSiteByDate] api Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
}



