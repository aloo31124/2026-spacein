const Booking = require('../models/booking.model');
const Room = require('../models/room.model');

/* 依照條件搜尋 [預約紀錄] */
exports.joinBookingRoomOwner = async (booking, ownerId) => {
    try {
        console.log(`[searchBookingList] 搜尋 [預約紀錄] 開始`);
        const pagingParam = { pageIndex: 1, pageSize: 1000, sort: "asc", pageTotal:-1, dataTotal:-1 };
        // 篩選 教室, 依照擁有者名稱
        const roomList = (await Room.search({ownerId}, pagingParam)).roomList;

        // 篩選 教室
        const bookingList = (await Booking.select(booking, pagingParam)).bookingList;

        // 合併
        return bookingList.map(booking => {
            const room = roomList.find(room => room.id === booking.roomId);
            if(!room) return null;
            return booking;
        })
        .filter(booking => booking !== null);
    } catch(error) {
        throw new Error(`[searchBookingList]: ${error.message}`);
    }
}

exports.getAllBookingList = async () => {
    try {
        const bookingList = await Booking.exportAllBooking();
        return bookingList
            .map(booking => ({
                id: booking.id,
                userId: booking.userId,
                mail: booking.mail,
                startDate: booking.startDate,
                startTime: booking.startTime,
                endDatae: booking.endDatae,
                endTime: booking.endTime,
                roomId: booking.roomId,
                roomName: booking.roomName,
                siteId: booking.siteId,
                siteName: booking.siteName,
                bookingType: booking.bookingType,
            }))
            .sort((a, b) => a.id.localeCompare(b.id)); // 依 `id` 進行排序
    } catch (error) {
        throw new Error(`[getAllRooms]: ${error}`);
    }
};

exports.batchInsertBooking = async (bookingList) => {
    try {

    } catch (error) {
        throw new Error(`[batchInsertBooking] : ${error}`)
    }
}

/* 新增 [空間預約] */
exports.addBooking = async (booking) => {
    return Booking.addBooking(booking);
}

/* 新增 [空間預約] */
exports.deleteBooking = async (id) => {
    return Booking.deleteBooking(id);
}

