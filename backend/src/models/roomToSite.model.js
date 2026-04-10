const db = require('../firestore');
const Room = require('./room.model');
const Fuse = require('fuse.js');
const COLLECTION_NAME = 'RoomToSite';

class RoomToSite {
    constructor(id, name, roomId) {
        this.id = id;
        this.name = name;
        this.roomId = roomId;
    }

    /* 依照條件搜尋教室, 分頁 */
    static async search(roomToSite, pagingParam) {
        const { name } = roomToSite;
        let { pageIndex, pageSize, sort, pageTotal, dataTotal } = pagingParam; // 分頁參數
        let query = db.collection(COLLECTION_NAME);
        const snapshot = await query.get();
        let roomToSiteList = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        // 使用 Fuse.js 進行模糊搜尋
        if(name) {
            const fuse = new Fuse(roomToSiteList, {
                keys: ['name'],
                threshold: 0.2, // 設定匹配度（0 完全匹配，1 模糊匹配）
                includeScore: false,
            });
            roomToSiteList = fuse.search(name).map(result => result.item);
        }

        // 分頁設定
        dataTotal = (roomToSiteList.length);
        pageTotal = Math.ceil(roomToSiteList.length / pageSize);
        roomToSiteList = roomToSiteList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

        return {roomToSiteList, pagingParam:{...pagingParam, pageTotal, dataTotal}};
    }

    /* [空間管理] [教室座位] 查詢, 依照name */
    static async findByName(name) {
        const snapshot = await db.collection(COLLECTION_NAME).where('name', '==', name).get();
        return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }
    
    /* 新增 [教室座位] */
    static async add(roomToSite) {
        const docRef = await db.collection(COLLECTION_NAME).add(roomToSite);
        const docSnapshot = await docRef.get();
        console.log(" 新增 [教室座位] : ", {id: docRef.id, ...docSnapshot.data()});
        return ({id: docRef.id, ...docSnapshot.data()})
    }

    /* 更新 [教室座位] */
    static async update(roomToSite) {
        const docRef = db.collection(COLLECTION_NAME).doc(roomToSite.id);
        let {id, ..._roomToSite} = roomToSite;
        await docRef.update(_roomToSite);
        console.log("更新後 [教室座位]  : ", roomToSite);
        return roomToSite;
    }

    /* 刪除 [教室座位] */
    static async delete(id) {
        const docRef = db.collection(COLLECTION_NAME).doc(id);
        await docRef.delete();
        console.log("刪除 [教室座位] : ", id);
        return id;
    }

    // 取得所有 [教室座位] 資訊
    static async getAllRoomtositeList() {
        const snapshot = await db.collection(COLLECTION_NAME).get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return new RoomToSite(
                doc.id,
                data.name || "無 name",
                data.roomId || "無 roomId",
            );
        });
    }

    // 匯入 所有 空間座位資料 進入空表, 不卡控, 使用於備份還原。
    static async importAllRoomToSite(RoomToSiteList) {
        try {
            // 檢查表是否已存在資料
            const snapshot = await db.collection(COLLECTION_NAME).limit(1).get();
            if (!snapshot.empty) {
                console.log('[importAllRoomToSite]: 表已存在資料，匯入中止。');
                return { message: '表已存在資料，匯入中止。' };
            }

            // 表無資料，開始匯入
            const batch = db.batch();
            RoomToSiteList.forEach(roomData => {
                const room = new RoomToSite(
                    roomData.id.replace(/"/g, ''),
                    roomData.name.replace(/"/g, ''),
                    roomData.roomId.replace(/"/g, '')
                );
                const docRef = db.collection(COLLECTION_NAME).doc(room.id);
                batch.set(docRef, {
                    name: room.name,
                    roomId: room.roomId,
                });
            });

            await batch.commit();
            console.log('[importAllRoomToSite]: 資料匯入成功。');
            return { message: '資料匯入成功。' };
        } catch (error) {
            console.error('[importAllRoomToSite] error:', error);
            throw error;
        }
    }

}

module.exports = RoomToSite;
