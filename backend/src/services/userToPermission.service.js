const UserToPermission = require('../models/userToPermission.model');

/* 匯出 全部 使用者 權限 */
exports.getUserToPermissionExportList = async () => {
    try {
        return await UserToPermission.getAllUserToPermissionList();
    } catch (error) {
        console.error("[getUserToOwnerExportList] Error:", error);
    }
}
