const Owner = require('../models/owner.model');

/* 查詢 擁有者預設資料, 依照 ownerId */
exports.getOwnerProfile = async (ownerId) => {
    try {
        return await Owner.findByOwnerId(ownerId);
    } catch (error) {
        console.error("[getOwnerProfile] Error:", error);
    }
}

/* 新增或更新 擁有者預設資料 */
exports.saveOwnerProfile = async (owner) => {
    try {
        return await Owner.upsert(owner);
    } catch (error) {
        console.error("[saveOwnerProfile] Error:", error);
    }
}
