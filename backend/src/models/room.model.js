const db = require('../firestore');
const Fuse = require('fuse.js');
const COLLECTION_NAME = 'Room';

class Room {
    constructor(id, name, ownerId, isBookingAllSite = false) {
        this.id = id;
        this.name = name;
        this.ownerId = ownerId;
        this.isBookingAllSite = isBookingAllSite ?? false;
    }

    /* 依照條件搜尋教室, 分頁 */
    static async search(room, pagingParam) {
        const { name, ownerId } = room;
        let { pageIndex, pageSize, sort, pageTotal, dataTotal } = pagingParam; // 分頁參數
        let query = db.collection(COLLECTION_NAME);
        const snapshot = await query.get();
        let roomList = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        // 使用 Fuse.js 進行模糊搜尋
        if(name) {
            const fuse = new Fuse(roomList, {
                keys: ['name'],
                threshold: 0.3, // 設定匹配度（0 完全匹配，1 模糊匹配）
                includeScore: false,
            });
            roomList = fuse.search(name).map(result => result.item);
        }
        roomList = roomList
            .filter(room => 
                (ownerId ? room.ownerId === ownerId : true)
            );

        // 分頁設定
        dataTotal = (roomList.length);
        pageTotal = Math.ceil(roomList.length / pageSize);
        roomList = roomList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

        return {roomList, pagingParam:{...pagingParam, pageTotal, dataTotal}};
    }

    /* [空間管理] [教室] 查詢, 依照id */
    static async find(id) {
         const doc = await db.collection(COLLECTION_NAME).doc(id).get();
         if (!doc.exists) {
             console.log(`教室 不存在 id : ${id} `);
             return null;
         }
         console.log("教室 資訊 : ", {id: doc.id, ...doc.data()});
         return {id: doc.id, ...doc.data()};
    }

    /* [空間管理] [教室] 查詢, 依照name */
    static async findByName(name) {
        const snapshot = await db.collection(COLLECTION_NAME).where('name', '==', name).get();
        return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
    
    /* 新增 [教室] */
    static async add(room) {
        const docRef = await db.collection(COLLECTION_NAME).add(room);
        const docSnapshot = await docRef.get();
        console.log(" 新增 [教室] : ", {id: docRef.id, ...docSnapshot.data()});
        return ({id: docRef.id, ...docSnapshot.data()})
    }

    /* 更新 [教室] */
    static async update(room) {
        const docRef = db.collection(COLLECTION_NAME).doc(room.id);
        let {id, ..._room} = room;
        await docRef.update(_room);
        console.log("更新後 [教室]  : ", room);
        return room;
    }

    /* 刪除 [教室] */
    static async delete(id) {
        const docRef = db.collection(COLLECTION_NAME).doc(id);
        await docRef.delete();
        console.log("刪除 [教室] : ", id);
        return id;
    }

    // 取得所有房間資訊
    static async getAllRoomList() {
        const snapshot = await db.collection(COLLECTION_NAME).get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return new Room(
                doc.id,
                data.name || "未命名",
                data.ownerId || "未知",
                data.isBookingAllSite ?? false
            );
        });
    }

    // 匯入 空間資料, 卡控檢查
    static async importRooms(roomList) {
        const batch = db.batch();
        const logResults = [];

        for (const roomData of roomList) {
            const { id, name, ownerId } = roomData;
            const isBookingAllSite = roomData.isBookingAllSite ?? false;

            // **1. 檢查必要欄位**
            const missingFields = [];
            if (!id) missingFields.push("id");
            if (!name) missingFields.push("name");
            if (!ownerId) missingFields.push("ownerId");

            if (missingFields.length > 0) {
                logResults.push({
                    id: id || "N/A",
                    name: name || "N/A",
                    status: "欄位檢查未通過",
                    missingFields,
                });
                continue;
            }

            const roomRef = db.collection(COLLECTION_NAME).doc(id);
            const existingDoc = await roomRef.get();

            if (!existingDoc.exists) {
                // **2. 新增新房間**
                batch.set(roomRef, { id, name, ownerId, isBookingAllSite });

                logResults.push({
                    id,
                    name,
                    status: "新增成功",
                    newData: { id, name, ownerId, isBookingAllSite },
                });
            } else {
                // **3. 檢查變更並更新**
                const existingData = existingDoc.data();
                const updatedFields = {};

                if (existingData.name !== name) updatedFields.name = { before: existingData.name, after: name };
                if (existingData.ownerId !== ownerId) updatedFields.ownerId = { before: existingData.ownerId, after: ownerId };
                if (existingData.isBookingAllSite !== isBookingAllSite) updatedFields.isBookingAllSite = { before: existingData.isBookingAllSite, after: isBookingAllSite };

                if (Object.keys(updatedFields).length > 0) {
                    batch.update(roomRef, { name, ownerId, isBookingAllSite });

                    logResults.push({
                        id,
                        name,
                        status: "更新成功",
                        updatedFields,
                    });
                } else {
                    logResults.push({
                        id,
                        name,
                        status: "無變更",
                    });
                }
            }
        }

        await batch.commit();
        return logResults;
    }

    // 匯入 所有 空間資料 進入空表, 不卡控, 使用於備份還原。
    static async importAllRooms(roomList) {
        try {
            // 檢查 Room 表是否已存在資料
            const snapshot = await db.collection(COLLECTION_NAME).limit(1).get();
            if (!snapshot.empty) {
                console.log('[importAllRooms]: Room 表已存在資料，匯入中止。');
                return { message: 'Room 表已存在資料，匯入中止。' };
            }

            // Room 表無資料，開始匯入
            const batch = db.batch();
            roomList.forEach(roomData => {
                const room = new Room(
                    roomData.id.replace(/"/g, ''), // 移除引號
                    roomData.name.replace(/"/g, ''), // 移除引號
                    roomData.ownerId.replace(/"/g, ''), // 移除引號
                    roomData.isBookingAllSite === 'true' // 將字串轉為布林值
                );
                const docRef = db.collection(COLLECTION_NAME).doc(room.id);
                batch.set(docRef, {
                    name: room.name,
                    ownerId: room.ownerId,
                    isBookingAllSite: room.isBookingAllSite,
                });
            });

            await batch.commit();
            console.log('[importAllRooms]: Room 資料匯入成功。');
            return { message: 'Room 資料匯入成功。' };
        } catch (error) {
            console.error('[importAllRooms] error:', error);
            throw error;
        }
    }
  

}

module.exports = Room;
