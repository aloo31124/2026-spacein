const db = require('../firestore');
const COLLECTION_NAME = 'Owner';

/*
 * 擁有者預設資料表
 * 以 ownerId 作為文件 id, 一位擁有者僅一筆
 * 欄位名稱與教室表一致 (address, phone, closedWeekdays, openStartTime, openEndTime),
 * 教室新增時可直接整組帶入
 */
class Owner {
    constructor(id, ownerId, address, phone, closedWeekdays, openStartTime, openEndTime) {
        this.id = id;
        this.ownerId = ownerId;
        this.address = address;                 // 預設地址
        this.phone = phone;                     // 預設電話
        this.closedWeekdays = closedWeekdays;   // 預設每周不開放星期 (0=星期日 ~ 6=星期六)
        this.openStartTime = openStartTime;     // 預設每天開放起始時間 (如 09:00)
        this.openEndTime = openEndTime;         // 預設每天開放結束時間 (如 18:00)
    }

    /* 查詢 擁有者預設資料, 依照 ownerId */
    static async findByOwnerId(ownerId) {
        const doc = await db.collection(COLLECTION_NAME).doc(ownerId).get();
        if (!doc.exists) {
            console.log(`擁有者預設資料 不存在 ownerId : ${ownerId}`);
            return null;
        }
        console.log("擁有者預設資料 : ", { id: doc.id, ...doc.data() });
        return { id: doc.id, ...doc.data() };
    }

    /* 新增或更新 擁有者預設資料, 以 ownerId 為文件 id */
    static async upsertByOwnerId(ownerId, ownerDefault) {
        const { address = "", phone = "", closedWeekdays = [], openStartTime = "", openEndTime = "" } = ownerDefault;
        const docRef = db.collection(COLLECTION_NAME).doc(ownerId);
        await docRef.set({ ownerId, address, phone, closedWeekdays, openStartTime, openEndTime }, { merge: true });
        const docSnapshot = await docRef.get();
        console.log("儲存 擁有者預設資料 : ", { id: docRef.id, ...docSnapshot.data() });
        return { id: docRef.id, ...docSnapshot.data() };
    }
}

module.exports = Owner;
