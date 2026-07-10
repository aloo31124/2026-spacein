const UserToOwner = require('../models/userToOwner.model');
const UserToRole = require('../models/userToRole.model');
const User = require('../models/user.model');

/* 匯出 全部 使用擁有者 */
exports.getUserToOwner = async () => {
    try {
        return await UserToOwner.getAllUserToOwnerList();
    } catch (error) {
        console.error("[getUserToOwner] Error:", error);
    }
}

/* 找尋 擁有者 依照 預約者id, userId */
exports.findOwnerByUserId = async (userId) => {
    try {
        return await UserToOwner.findByUserId(userId);
    } catch (error) {
        console.error("[findOwnerByUserId] Error:", error);
        throw error;
    }
}

/* 查詢 預約者目前綁定之擁有者 */
exports.getOwnerByUserId = async (userId) => {
    const userToOwnerList = await UserToOwner.findByUserId(userId);
    if(userToOwnerList.length === 0) return null;

    const ownerId = userToOwnerList[0].ownerId;
    const owner = await User.find(ownerId);

    // 即使擁有者帳號資料異常遺失，仍回傳既有綁定，避免預約者重新綁定。
    if(!owner) {
        return {id: ownerId, name: "查無擁有者資料", email: ""};
    }

    return {
        id: owner.id,
        name: owner.name,
        email: owner.email,
    };
}

/* 新增 預約者 對應 擁有者 */
exports.addUserToOwner = async (userToOwner) => {
    try {
        const existingList = await UserToOwner.findByUserId(userToOwner.userId);
        if(existingList.length > 0) {
            return {error: "已綁定擁有者，綁定後不可修改"};
        }
        return await UserToOwner.create(userToOwner);
    } catch (error) {
        console.error("[addUserToOwner] Error:", error);
        throw error;
    }
}

/* 查詢 擁有者, 依照 email */
exports.getOwnerByEmail = async (email) => {
    try {
        // 查詢該信箱使用者
        const owner = await User.findByMail(email);
        if(!owner) {
            console.error("[getUserToOwnerExportList] 查無此帳號 email :", email);
            return {error: "查無此帳號 email :" + email};
        }
        // 查詢該使用者是否為 擁有者
        const userToRole = await UserToRole.findByUserId(owner.id);
        if(!userToRole.some(item => item.role === "owner")) {
            console.error("[getUserToOwnerExportList] 此使用者非擁有者 :", owner);
            return {error: "此使用者非擁有者"};
        }
        console.log("[getUserToOwnerExportList] 查詢到該 擁有者 owner :", owner);
        return owner;
    } catch (error) {
        console.error("[getUserToOwnerExportList] Error:", error);
    }
}
