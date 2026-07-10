const Room = require('../models/room.model');
const RoomToSite = require('../models/roomToSite.model');
const User = require('../models/user.model');

/* 依照條件搜尋教室 */
exports.searchRoomList = async (room, ownerId) => {
    try {
        console.log(`[searchRoomList] 搜尋教室開始`);
        const pagingParam = { pageIndex: 1, pageSize: 1000, sort: "asc", pageTotal:-1, dataTotal:-1 };
        // 搜尋出 所有教室
        const roomList = (await Room.search(room, pagingParam)).roomList;
        // 串組使用者信箱, 與判斷該教室是否擁有 座位  
        // 依照 當前 ownerId, 逐一比對
        const roomListByOwnerId = roomList.filter(room => room.ownerId === ownerId);
        const siteList = (await RoomToSite.search({}, pagingParam)).roomToSiteList;
        const user = await User.find(ownerId);
        const result = roomListByOwnerId.map(room => {
            return {...room, email: user.email, 
                    haveSite: siteList.some(site => site.roomId === room.id) // 判斷教室是否擁有座位
                }
        })
        return result;
    } catch(error) {
        //throw new Error(`[searchRoomList]: ${error.message}`); // throw 會導致錯誤中斷
        console.error(`[searchRoomList]: ${error.message}`);
    }
}

/* 取得所有教室完整資訊, 
    用於匯出, 取 dialog列表
*/
exports.getAllRoomList = async () => {
    try {
        const rooms = await Room.getAllRoomList();
        return rooms
            /*
            .map(room => ({
                id: room.id,
                name: room.name,
                ownerId: room.ownerId,
                isBookingAllSite: room.isBookingAllSite
            }))
            .sort((a, b) => a.id.localeCompare(b.id)); // 依 `id` 進行排序
            */
    } catch (error) {
        //throw new Error(`[getAllRooms]: ${error.message}`);
        console.error(`[getAllRooms]: ${error.message}`);
    }
};


exports.patchImportRoomList = async (roomList) => {
    try {
        console.log(`[${new Date().toISOString()}] 開始匯入房間資料`);
        const logResults = await Room.importRooms(roomList);
        console.log(`[patchImportRoomList]: `, JSON.stringify(logResults, null, 2));
        return logResults;
    } catch (error) {
        //throw new Error(`[patchImportRoomList]: ${error.message}`);
        console.error(`[patchImportRoomList]: ${error.message}`);
    }
};

/* [空間管理] [教室] 查詢, 依照id */
exports.find = async (id) => {
    try {
        return await Room.find(id);
    } catch (error) {
        console.error(" [find] id, Error:", id, error);
    }
}

/* [空間管理] [教室] 查詢, 依照 name */
exports.findByName = async (name) => {
    try {
        return await Room.findByName(name);
    } catch (error) {
        console.error(" [findByName] name, Error:", name, error);
    }
}

/* [空間管理] [教室] 新增 */
exports.add = async (room, ownerId) => {
    try {
        // 教室開放資訊欄位 (地址/電話/每周不開放星期/每天開放時段), 未帶入時補預設值
        const { address = "", phone = "", closedWeekdays = [], openStartTime = "", openEndTime = "" } = room;
        const _room = {...room, address, phone, closedWeekdays, openStartTime, openEndTime, ownerId, isBookingAllSite:false}
        return await Room.add(_room);
    } catch (error) {
        console.error(" [add] Error:", error);
    }
}

/* [空間管理] [教室] 編輯 */
exports.update = async (room, ownerId) => {
    try {
        return await Room.update(room);
    } catch (error) {
        console.error(" [update] Error:", error);
    }
}

/* [空間管理] [教室] 刪除 */
exports.delete = async (id) => {
    try {
        return await Room.delete(id);
    } catch (error) {
        console.error(" [delete] Error:", error);
    }
}


