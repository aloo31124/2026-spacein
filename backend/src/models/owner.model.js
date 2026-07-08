const db = require('../firestore');
const COLLECTION_NAME = 'Owner';

/*
 * [擁有者] 預設資料表
 * doc id 直接使用 ownerId（擁有者 user id），
 * 讓 查詢/更新 不需先搜尋，upsert 也不會產生重複資料。
 * 欄位:
 *  - ownerId          擁有者 user id
 *  - address          預設地址
 *  - phone            預設電話
 *  - weeklyCloseDays  預設每周不開放時段, 星期數字陣列 (0=周日 ~ 6=周六), 如 [0, 6] 表示 六日不開放
 *  - openStartTime    預設每天開放時段 開始, 格式 "09:00"
 *  - openEndTime      預設每天開放時段 結束, 格式 "18:00"
 */
class Owner {

    /* 查詢 擁有者預設資料, 依照 ownerId */
    static async findByOwnerId(ownerId) {
        const doc = await db.collection(COLLECTION_NAME).doc(ownerId).get();
        if (!doc.exists) {
            console.log(`擁有者預設資料 不存在 ownerId : ${ownerId} `);
            return null;
        }
        console.log("擁有者預設資料 : ", { id: doc.id, ...doc.data() });
        return { id: doc.id, ...doc.data() };
    }

    /* 新增或更新 擁有者預設資料 (upsert) */
    static async upsert(owner) {
        const { ownerId, address, phone, weeklyCloseDays, openStartTime, openEndTime } = owner;
        const docRef = db.collection(COLLECTION_NAME).doc(ownerId);
        await docRef.set({
            ownerId,
            address: address ?? "",
            phone: phone ?? "",
            weeklyCloseDays: weeklyCloseDays ?? [],
            openStartTime: openStartTime ?? "",
            openEndTime: openEndTime ?? "",
        }, { merge: true });
        const docSnapshot = await docRef.get();
        console.log("新增/更新 擁有者預設資料 : ", { id: docRef.id, ...docSnapshot.data() });
        return { id: docRef.id, ...docSnapshot.data() };
    }
}

module.exports = Owner;
