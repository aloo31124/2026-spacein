const Room = require('../models/room.model');
const RoomToSite = require('../models/roomToSite.model');
const User = require('../models/user.model');
const Booking = require('../models/booking.model');
const roomService = require('../services/room.service');

/* 搜尋 座位 與 教室 */
exports.joinSiteRoomUser = async (_roomToSite, ownerId) => {
    try {
        console.log(`[joinSiteRoomUser] 座位教室資訊搜尋 使用者 userId: ${ownerId}`);
        const {roomName, siteName} = _roomToSite
        const pagingParam = { pageIndex: 1, pageSize: 1000, sort: "asc", pageTotal:-1, dataTotal:-1 };

        // 擁有者資訊
        const user = await User.find(ownerId)
        if(!user) {
            console.log(`查無此 使用者 userId: ${ownerId}`);
            return;
        }

        // 篩選 教室
        const roomList = (await Room.search({name: roomName, ownerId}, pagingParam)).roomList;
        if(!roomList.length || roomList.length === 0) {
            console.log(`此 使用者 userId: ${ownerId} 無所屬教室`);
            return;
        }

        // 篩選 座位
        const siteList = (await RoomToSite.search({name: siteName}, pagingParam)).roomToSiteList;

        // 撈出 預約紀錄, 不限制擁有者, 篩選被預約 教室
        const bookingList = (await Booking.select({}, pagingParam)).bookingList;
        
        // join 合併表
        return siteList.map(site => {
            const room = roomList.find(room => room.id === site.roomId);
            if(!room) return null;
            return {
                ownerId: user.id,
                email: user.email,
                roomName: room.name,
                haveBooking: bookingList.some(booking => booking.siteId === site.id),
                ...site
            }
        })
        .filter(site => site !== null);
    } catch(error) {
        console.error(" [joinSiteRoomUser] Error:", error);
    }
}


/* 取得所有 [教室座位] 完整資訊, 用於匯出 */
exports.getAllRoomtositeList = async () => {
    try {
        const roomtositeList = await RoomToSite.getAllRoomtositeList();
        return roomtositeList
    } catch (error) {
        console.error(" [add] Error:", error);
    }
};


/* [空間管理] [教室座位] 新增 */
exports.add = async (roomToSite, ownerId) => {
    try {
        return await RoomToSite.add(roomToSite);
    } catch (error) {
        console.error(" [add] Error:", error);
    }
}

/* [空間管理] [教室座位] 編輯 */
exports.update = async (roomToSite, ownerId) => {
    try {
        return await RoomToSite.update(roomToSite);
    } catch (error) {
        console.error(" [update] Error:", error);
    }
}

/* [空間管理] [教室] 刪除 */
exports.delete = async (id, ownerId) => {
    try {
        return await RoomToSite.delete(id);
    } catch (error) {
        console.error(" [delete] Error:", error);
    }
}


/*
 * 回傳所有 教室,座位 資訊, 並有 booking 時段判斷, 若已被預約, 則註記 isbooking: true
 *  refactor : firestore 操作 待抽離至 RoomToSite model
 */
const db = require('../firestore');
exports.getRoomSiteByDate = async (startDate, startTime, endTime) => {
    try {
        // 取 預約表, 並 篩選出 已經與 當前預約日期重疊之預約記錄
        const bookingSnapshot = await db.collection('Booking')
            .where('startDate', '==', startDate)
            .get();
        const bookingList = bookingSnapshot.docs.map(doc => (Object.assign({ startTime: doc.data().startTime, endTime: doc.data().endTime, siteId: doc.data().siteId }, doc.data())));
        const bookingFilterList = bookingList.filter(booking => (new Date(startDate + " " + booking.startTime).getTime() < new Date(startDate + " " + endTime).getTime())
            &&
                (new Date(startDate + " " + booking.endTime).getTime() > new Date(startDate + " " + startTime).getTime()));
        // 取 座位表
        const roomToSiteSnapshot = await db.collection('RoomToSite').get();
        const siteList = roomToSiteSnapshot.docs.map(doc => (Object.assign({ id: doc.id, roomId: doc.data().roomId }, doc.data() // 獲取 RoomToSite 的其他數據
        )));
        // 取 教室表
        const roomSnapshot = await db.collection('Room').get();
        const roomList = roomSnapshot.docs.map(doc => ({
            roomId: doc.id,
            roomName: doc.data().name
        }));
        // 三表合併
        const resultList = siteList.map(site => {
            const matchRoom = roomList.find(room => room.roomId === site.roomId);
            const matchBooking = bookingFilterList.filter(booking => booking.siteId === site.id);
            if (matchRoom) {
                return Object.assign(Object.assign(Object.assign({}, site), matchRoom), { isBooking: (matchBooking.length > 0) });
            }
            else {
                return site;
            }
        });
        return resultList;
    }
    catch (error) {
        throw new Error(`[getRoomSiteByDate]: ${error.message}`);
        return;
    }
};



/* [空間管理] [教室座位] 匯入, 教室,座位, ownerId 綁定 */
exports.importRoomSite = async (ownerId, roomToSiteList) => {
    try {
        let messageRoom = ''; // 匯入卡控資訊
        // 1. 提取所有唯一的 roomName
        const uniqueRoomNames = [...new Set(roomToSiteList.map(item => item.roomName))];
        const roomMap = new Map(); // 用於儲存 roomName 對應的 room 物件

        // 2. 批量檢查並新增教室（避免並發問題）
        for (const roomName of uniqueRoomNames) {
            messageRoom = '';
            let room = await roomService.findByName(roomName);
            if (!room) {
                try {
                    room = await roomService.add({ name: roomName }, ownerId);
                    console.log(`[importRoomSite] [教室] 新增成功: ${room.id}, ${room.name}`);
                    messageRoom += `[教室] 新增成功: ${room.name} `;
                } catch (error) {
                    console.error(`[importRoomSite] [教室] 新增失敗: ${roomName}, error: ${error.message}`);
                    messageRoom += `[教室] 新增失敗: ${roomName}, error: ${error.message} `;
                }
            } else {
                console.log(`[importRoomSite] [教室] 已存在: ${roomName}`);
                messageRoom += `[教室] 已存在: ${roomName}`;
            }
            roomMap.set(roomName, {messageRoom, ...room}); // 儲存 roomName 對應的 room
        }

        // 3. 處理每個 roomToSite，確保不重複新增座位
        const results = await Promise.all(
            roomToSiteList.map(async (roomToSite) => {
                let message = '';
                const room = roomMap.get(roomToSite.roomName);

                if (!room || !room.id) {
                    message += `${room.messageRoom}; [教室] ${roomToSite.roomName} 資訊異常;`;
                    console.log(`[importRoomSite] [教室] ${roomToSite.roomName} 資訊異常: `);
                    return { ...roomToSite, message };
                }

                const roomId = room.id;

                // 4. 檢查座位是否已存在
                const checkRoomToSite = await RoomToSite.findByName(roomToSite.siteName);
                if (checkRoomToSite && checkRoomToSite.name) {
                    message += `${room.messageRoom}; [教室座位] 已存在: ${checkRoomToSite.name};`;
                    console.log(`[importRoomSite] [教室座位] 已存在: ${checkRoomToSite.name}`);
                    return { ...roomToSite, message };
                }

                // 5. 新增座位
                try {
                    const newRoomToSite = await RoomToSite.add({ roomId, name: roomToSite.siteName });
                    message += `${room.messageRoom}; [教室座位] 新增成功: ${roomToSite.siteName} `;
                    console.log(`[importRoomSite] [教室座位] 新增成功: ${newRoomToSite}`);
                    return { ...roomToSite, message };
                } catch (error) {
                    message += `${room.messageRoom}; [教室座位] 新增失敗: ${roomToSite.siteName}, error:  ${error.message}; `;
                    console.log(`[importRoomSite] [教室座位] 新增失敗: ${roomToSite.siteName}, error: ${error.message}`);
                    return { ...roomToSite, message };
                }
            })
        );

        return results;
    } catch (error) {
        throw new Error(`[importRoomSite] error: ${error.message}`);
    }
};




