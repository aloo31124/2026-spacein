const roomService = require('./room.service');
const bookingService = require('./booking.service');
const UserModel = require('../models/user.model');
const UserToOwner = require('../models/userToOwner.model');
const UserToPayment = require('../models/userToPayment.model');
const UserToPermission = require('../models/userToPermission.model');
const Room = require('../models/room.model');
const RoomToSite = require('../models/roomToSite.model');
const Booking = require('../models/booking.model');
const Payment = require('../models/payment.model');

exports.importAllDB = async (reqBody) => {
    try {
        const resultUser = await UserModel.importAllUser(reqBody.user_all);
        const resultUserToOwner = await UserToOwner.importAllUserToOwner(reqBody.usertoowner_all);
        const resultUserToPayment = await UserToPayment.importAllUserToPayment(reqBody.usertopayment_all);
        //const resultUserToPermission = await UserToPermission.importAllUserToPermission(reqBody.usertopermission_all);
        const resultRoom = await Room.importAllRooms(reqBody.room_all);
        const resultRoomToSite = await RoomToSite.importAllRoomToSite(reqBody.site_all);
        const resultBooking = await Booking.importAllBooking(reqBody.booking_all);
        const resultPayment = await Payment.importAllPayment(reqBody.payment_all);
        return {result: {resultUser, resultUserToOwner, resultUserToPayment, 
                        resultRoom, resultRoomToSite, resultBooking, resultPayment }};
    } catch (error) {
        throw new Error(`[importAllDB]: ${error.message}`);
    }
}

exports.getUserExportList = async () => {
    try {
        return await UserModel.getAllUserList();
    } catch (error) {
        console.error("[getUserExportList] Error:", error);
    }
}

exports.getRoomExportList = async () => {
    try {
        return await roomService.getAllRoomList();
    } catch (error) {
        console.error("[getRoomExportList] Error:", error);
    }
};

exports.patchImportRoomList = async (roomList) => {
    try {
        console.log(`[${new Date().toISOString()}] 開始匯入房間資料`);
        const logResults = await roomService.patchImportRoomList(roomList);
        console.log(`[patchImportRoomList] : `, JSON.stringify(logResults, null, 2));
        return logResults;
    } catch (error) {
        throw new Error(`[patchImportRoomList]: ${error.message}`);
    }
};

exports.getBookingExportList = async () => {
    try {
        return await bookingService.getAllBookingList();
    } catch (error) {
        console.error("[getBookingExportList] Error:", error);
    }
}


