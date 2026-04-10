const db = require('../firestore');
const Fuse = require('fuse.js');
const COLLECTION_NAME = 'UserToPermission';

class UserToPermission {
    constructor(id, userId, PermissionType) {
        this.id = id;
        this.userId = userId;
        this.PermissionType = PermissionType;
    }
     
    // 取得所有 全部 使用者 權限 資訊
    static async getAllUserToPermissionList() {
        const snapshot = await db.collection(COLLECTION_NAME).get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return new UserToPermission(
                doc.id,
                data.userId || "無 userId",
                data.PermissionType || "無 PermissionType"
            );
        });
    }

    // 匯入 所有 使用者對應權限 進入空表, 不卡控, 使用於備份還原。
    static async importAllUserToPermission(userToPermissionList) {
        try {
            // 檢查 Room 表是否已存在資料
            const snapshot = await db.collection(COLLECTION_NAME).limit(1).get();
            if (!snapshot.empty) {
                console.log('[importAllUserToPermission]: 資料表已存在資料，匯入中止。');
                return { message: '資料表已存在資料，匯入中止。' };
            }

            // Room 表無資料，開始匯入
            const batch = db.batch();
            userToPermissionList.forEach(userData => {
                const user = new UserToPermission(
                    userData.id.replace(/"/g, ''),
                    userData.PermissionType.replace(/"/g, ''),
                    userData.userId.replace(/"/g, ''),
                );
                const docRef = db.collection(COLLECTION_NAME).doc(user.id);
                batch.set(docRef, {
                    PermissionType: user.PermissionType,
                    userId: user.userId,
                });
            });

            await batch.commit();
            console.log('[importAllUserToPermission]: 資料匯入成功。');
            return { message: '資料匯入成功。' };
        } catch (error) {
            console.error('[importAllUserToPermission] error:', error);
            throw error;
        }
    }
}
module.exports = UserToPermission;
