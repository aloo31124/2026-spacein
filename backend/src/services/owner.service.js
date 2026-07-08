const Owner = require('../models/owner.model');

/* 查詢 擁有者預設資料, 依照 ownerId */
exports.getOwnerDefault = async (ownerId) => {
    try {
        return await Owner.findByOwnerId(ownerId);
    } catch (error) {
        console.error("[getOwnerDefault] Error:", error);
    }
}

/* 儲存 擁有者預設資料 (新增或更新) */
exports.saveOwnerDefault = async (ownerId, ownerDefault) => {
    try {
        return await Owner.upsertByOwnerId(ownerId, ownerDefault);
    } catch (error) {
        console.error("[saveOwnerDefault] Error:", error);
    }
}
