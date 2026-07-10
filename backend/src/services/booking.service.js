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

// 星期顯示名稱, 索引對應 Date.getDay() (0=星期日 ~ 6=星期六)
const WEEKDAY_NAMES = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

/* 時間字串補零 (9:00 -> 09:00), 供 HH:mm 字串比較 */
const padTime = (time) => {
    const [hour = "", minute = ""] = String(time).split(':');
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
}

/*
 * 卡控 [空間預約] 是否落在教室不開放時段, 違規則丟出 status 400 錯誤
 * 1. 每周不開放時段 : 預約日期之星期 被教室勾選為不開放
 * 2. 每天開放時段 : 預約起訖時間 超出教室每日開放起訖時間
 */
const checkRoomOpenRule = async (booking) => {
    const room = await Room.find(booking.roomId);
    if (!room) return; // 查無教室設定, 不卡控 (維持原有預約行為)

    // 卡控 每周不開放時段, 日期格式 YYYY-M-D 手動解析避免時區誤差
    const [year, month, day] = String(booking.startDate).split('-').map(Number);
    const weekday = new Date(year, month - 1, day).getDay();
    if (Array.isArray(room.closedWeekdays) && room.closedWeekdays.includes(weekday)) {
        const error = new Error(`預約失敗：教室「${room.name}」於 ${booking.startDate}（${WEEKDAY_NAMES[weekday]}）不開放。`);
        error.status = 400;
        throw error;
    }

    // 卡控 每天開放時段
    if (room.openStartTime && room.openEndTime) {
        const startTime = padTime(booking.startTime);
        const endTime = padTime(booking.endTime);
        if (startTime < padTime(room.openStartTime) || padTime(room.openEndTime) < endTime) {
            const error = new Error(`預約失敗：教室「${room.name}」每日開放時段為 ${room.openStartTime}~${room.openEndTime}，`
                + `您預約的 ${booking.startTime}~${booking.endTime} 不在開放時段內。`);
            error.status = 400;
            throw error;
        }
    }
}

/* 新增 [空間預約], 存入前卡控教室不開放時段 */
exports.addBooking = async (booking) => {
    await checkRoomOpenRule(booking);
    return Booking.addBooking(booking);
}

/* 新增 [空間預約] */
exports.deleteBooking = async (id) => {
    return Booking.deleteBooking(id);
}

