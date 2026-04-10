const db = require('../firestore');
const Fuse = require('fuse.js');
const COLLECTION_NAME = 'Booking';

class Booking {
    constructor(id, userId, mail, startDate, startTime, endDatae, endTime, 
                roomId, roomName, siteId, siteName, bookingType) {
        this.id = id;
        this.userId = userId;
        this.mail = mail;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDatae = endDatae;
        this.endTime = endTime;
        this.roomId = roomId;
        this.roomName = roomName;
        this.siteId = siteId;
        this.siteName = siteName;
        this.bookingType = bookingType;
    }

    /* 依照條件搜尋 [預約紀錄] , 分頁 */
    static async select(booking, pagingParam) {
        const { roomName, siteName, startDateMin, startDateMax } = booking;
        let { pageIndex, pageSize, sort, pageTotal, dataTotal } = pagingParam; // 分頁參數
        let query = db.collection(COLLECTION_NAME);
        const snapshot = await query.get();
        let bookingList = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

        // 進行模糊搜尋 (使用 Fuse.js )
        if(roomName) {
            const fuse = new Fuse(bookingList, {
                keys: ['roomName'],
                threshold: 0.2, // 設定匹配度（0 完全匹配，1 模糊匹配）
                includeScore: false,
            });
            bookingList = fuse.search(roomName).map(result => result.item);
        }
        if(siteName) {
            const fuse = new Fuse(bookingList, {
                keys: ['siteName'],
                threshold: 0.2, // 設定匹配度（0 完全匹配，1 模糊匹配）
                includeScore: false,
            });
            bookingList = fuse.search(siteName).map(result => result.item);
        }

        // 必要條件搜尋
        bookingList = bookingList
            .sort((a, b) => a[sort] > b[sort] ? 1 : -1)
            .filter(_booking => 
                (startDateMin ? (startDateMin <= _booking.startDate) : true)
                && (startDateMax ? (_booking.startDate <= startDateMax) : true)
                //&& (startTime ? (startDateMin <= _booking.endDatae && _booking.endDatae >= startDateMax) : true)
            )


        // 分頁設定
        dataTotal = (bookingList.length);
        pageTotal = Math.ceil(bookingList.length / pageSize);
        bookingList = bookingList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

        return {bookingList, pagingParam:{...pagingParam, pageTotal, dataTotal}};
    }

    // 取得所有預約資訊
    static async exportAllBooking() {
        const snapshot = await db.collection(COLLECTION_NAME).get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return new Booking(
                doc.id, 
                data.userId || "",
                data.mail || "",
                data.startDate || "",
                data.startTime || "",
                data.endDatae || "", // 待 修正拼寫錯誤
                data.endTime || "",
                data.roomId || "",
                data.roomName || "",
                data.siteId || "",
                data.siteName || "",
                data.bookingType || ""
            );
        });
    }

    // 匯入 所有 預約紀錄資料 進入空表, 不卡控, 使用於備份還原。
    static async importAllBooking(bookingList) {
        try {
            // 檢查表是否已存在資料
            const snapshot = await db.collection(COLLECTION_NAME).limit(1).get();
            if (!snapshot.empty) {
                console.log('[importAllBooking]: 表已存在資料，匯入中止。');
                return { message: '表已存在資料，匯入中止。' };
            }

            // 表無資料，開始匯入
            const batch = db.batch();
            bookingList.forEach(bookingData => {
                const booking = new Booking(
                    bookingData.id || "",
                    bookingData.userId || "",
                    bookingData.mail || "",
                    bookingData.startDate || "",
                    bookingData.startTime || "",
                    bookingData.endDatae || "",
                    bookingData.endTime || "",
                    bookingData.roomId || "",
                    bookingData.roomName || "",
                    bookingData.siteId || "",
                    bookingData.siteName || "",
                    bookingData.bookingType || "",
                );
                const docRef = db.collection(COLLECTION_NAME).doc(booking.id.replace(/"/g, ''));
                batch.set(docRef, {
                    userId: booking.userId.replace(/"/g, '') || "",
                    mail: booking.mail.replace(/"/g, '') || "",
                    startDate: booking.startDate.replace(/"/g, '') || "",
                    startTime: booking.startTime.replace(/"/g, '') || "",
                    endDatae: booking.endDatae.replace(/"/g, '') || "",
                    endTime: booking.endTime.replace(/"/g, '') || "",
                    roomId: booking.roomId.replace(/"/g, '') || "",
                    roomName: booking.roomName.replace(/"/g, '') || "",
                    siteId: booking.siteId.replace(/"/g, '') || "",
                    siteName: booking.siteName.replace(/"/g, '') || "",
                    bookingType: booking.bookingType.replace(/"/g, '') || "",
                });
            });

            await batch.commit();
            console.log('[importAllBooking]: 資料匯入成功。');
            return { message: '資料匯入成功。' };
        } catch (error) {
            console.error('[importAllBooking] error:', error);
            throw error;
        }
    }

    // 更新或新增預約資料
    static async upsertBooking(bookingData) {
        const docRef = db.collection(COLLECTION_NAME).doc(bookingData.id);
        await docRef.set(bookingData, { merge: true });
        return bookingData;
    }
    
    /* 新增 [空間預約] */
    static async addBooking(booking) {
        const docRef = await db.collection(COLLECTION_NAME).add(booking);
        const docSnapshot = await docRef.get();
        console.log(" 新增 [空間預約] : ", {id: docRef.id, ...docSnapshot.data()});
        return ({id: docRef.id, ...docSnapshot.data()})
    }

    /* 刪除 [預約空間] */
    static async deleteBooking(id) {
        const docRef = db.collection(COLLECTION_NAME).doc(id);
        await docRef.delete();
        console.log("刪除 [預約空間] : ", id);
        return id;
    }
}

module.exports = Booking;
