const paymentService = require('../../services/payment.service');
const paymentHistoryService = require('../../services/paymentHistory.service');
const userService = require('../../services/user.service');
const userToRoleService = require('../../services/userToRole.service');
const userToPaymentService = require('../../services/userToPayment.service');

/* 搜尋使用者 */
exports.searchUser = async (req, res) => {
    try {
        console.log(" [searchUser] 開始 req.body: ", req.body);
        const { user } = req.body;
        const result = await userService.searchUserList(user);
        // 標記每位使用者是否已具備 系統管理員(system) 角色, 供列表切換 轉/取消 系統管理員按鈕
        const systemUserIdList = await userToRoleService.getUserIdListByRole('system');
        result.userList = result.userList.map(u => ({ ...u, isSystem: systemUserIdList.includes(u.id) }));
        console.log(" [searchUser] 結束 result : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [searchUser] 500 錯誤', error: error.message });
    }
}

/* [系統管理] 使用者 轉為 系統管理員 */
exports.addUserSystemRole = async (req, res) => {
    try {
        console.log(" [addUserSystemRole] 開始 req.body: ", req.body);
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ message: '缺少 userId' });
        const result = await userToRoleService.addUserToRole({ userId, role: 'system' });
        console.log(" [addUserSystemRole] 結束 result : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [addUserSystemRole] 500 錯誤', error: error.message });
    }
}

/* [系統管理] 取消 使用者的 系統管理員 角色 */
exports.deleteUserSystemRole = async (req, res) => {
    try {
        console.log(" [deleteUserSystemRole] 開始 req.params: ", req.params);
        const { userId } = req.params;
        const result = await userToRoleService.removeUserToRole(userId, 'system');
        if (!result) return res.status(404).json({ message: '該使用者不具系統管理員角色' });
        console.log(" [deleteUserSystemRole] 結束 result : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [deleteUserSystemRole] 500 錯誤', error: error.message });
    }
}

/* 搜尋 [使用者角色] */
exports.searchUserRole = async (req, res) => {
    try {
        console.log(" [searchUserRole] 開始 req.body: ", req.body);
        const { email, role } = req.body;
        const result = await userToRoleService.joinUserRole(email, role);
        console.log(" [searchUserRole] 結束 result : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [searchUserRole] 500 錯誤', error: error.message });
    }
}

/* 搜尋 [使用者方案] */
exports.searchUserPayment = async (req, res) => {
    try {
        console.log(" [searchUserPayment] 開始 req.body: ", req.body);
        const { email, paymentName } = req.body;
        const result = await userToPaymentService.joinUserPayment(email, paymentName);
        console.log(" [searchUserPayment] 結束 result : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [searchUserPayment] 500 錯誤', error: error.message });
    }
}

/* 搜尋 金流紀錄 */
exports.searchPayRecord = async (req, res) => {
    try {
        console.log(" [searchPayRecord] 開始 req.body: ", req.body);
        const { email, paymentName } = req.body;
        const result = await paymentHistoryService.searchPaymentHistoryInfo(email, paymentName);
        console.log(" [searchPayRecord] 結束 result : ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [searchPayRecord] 500 錯誤', error: error.message });
    }
}

/* [系統管理] 搜尋 [方案] */
exports.searchPayment = async (req, res) => {
    try {
        console.log(" [searchPayment] 開始 req.params: ", req.params);
        const {planName="", planTimeType="", planType=""} = req.params;
        const paymentList = await paymentService.search(planName, planTimeType, planType);
        // 使用者 對 方案
        const userToPaymentList = await userToPaymentService.getAllUserToPaymentList();
        const result = paymentList.map(payment => {
            return {
                ...payment,
                haveBuy: userToPaymentList.some(u2p => u2p.paymentId === payment.id) // 該方案已被購買
            }
        });
        console.log(" [searchPayment] 結束 result:  ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [searchPayment] 500 錯誤', error: error.message });
    }
};

/* [系統管理] 匯出所有 [方案] */
exports.exportPayment = async (req, res) => {
    try {
        console.log(" [exportPayment] 開始 req.params: ", req.params);
        const result = await paymentService.search("all", "all", "all");
        console.log(" [exportPayment] 結束 ");
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [exportPayment] 500 錯誤', error: error.message });
    }
};

/* [系統管理] 新增 [方案] */
exports.postPayment = async (req, res) => {
    try {
        console.log(" [postPayment] 開始 req.body ", req.body);
        const {payment} = req.body;
        const result = await paymentService.add(payment);
        console.log(" [postPayment] 結束, 成功: ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [postPayment] 500 錯誤', error: error.message });
    }
};

/* [系統管理] 更新 [方案] */
exports.patchPayment = async (req, res) => {
    try {
        console.log(" [patchPayment] 開始 req.body ", req.body);
        const {payment} = req.body;
        const result = await paymentService.update(payment);
        console.log(" [patchPayment] 結束, 成功: ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [patchPayment] 500 錯誤', error: error.message });
    }
};

/* [系統管理] 刪除 [方案] */
exports.deletePayment = async (req, res) => {
    try {
        console.log(" [deletePayment] 開始 req.params ", req.params);
        const result = await paymentService.delete(req.params.id);
        console.log(" [deletePayment] 結束, 成功: ", result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ result: ' [deletePayment] 500 錯誤', error: error.message });
    }
};


