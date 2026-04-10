/*
 * [控制層] 商品購物, 串接綠界金流 ecpay
 */
const payEcpayService = require("../../services/pay-ecpay.service");
const userToRoleService = require("../../services/userToRole.service");
const UserToRole = require("../../models/userToRole.model");


/** 取得 綠界 付款結果 */
exports.postResultServer = async (req, res) => {
    try {
        console.log(' [postResultServer] :', req.body, req.query, req.params);
        const {CustomField1, CustomField2} = req.body;
        // 新增紀錄
        const result1 = await payEcpayService.addPaymentHistory({userId: CustomField1, paymentId: CustomField2, message: "付款伺服器結果 req.body : " + JSON.stringify(req.body, null, 2)});
        console.log(' [postResultServer] addPaymentHistory :', result1);
        // 更新(新增) 使用者 購買方案
        const result2 = await payEcpayService.addUserToPayment(CustomField1, CustomField2);
        console.log(' [postResultServer] addUserToPayment :', result2);
        // 檢查是否已有 [擁有者] owner 角色, 已有角色為 [續約],  若無 角色為首次購買, 新增角色
        const result3 = await userToRoleService.getUserRoleByUserId(CustomField1);
        if(result3?.length > 0) { // 續約
            console.log(' [postResultServer] getUserRoleByUserId  續約成功 ', result3);
        } else { // 首次建立帳號
            console.log(' [postResultServer] getUserRoleByUserId 轉創建帳號 result3 : :', result3);
            const result4 = await userToRoleService.addUserToRole({userId: CustomField1, role: 'owner'});
            console.log(' [postResultServer] addUserToRole 首次建立帳號 result4 :', result4);
        }
        // 回傳結果
        res.status(200).send("1|OK");
    } catch (error) {
        console.error("[postResultServer] 失敗 : ", error);
        res.status(500).json({ error: "[postResultServer] 失敗 : " + error });
    }
}

/** 付款結果畫面 */
exports.getResultClientPageHtml = async (req, res) => {
    try {
        console.log(' [getResultClientPageHtml] :', req.body, req.query, req.params);
        //payEcpayService.addPaymentHistory({userId: "userId02", paymentId:"paymentId02", message: "付款客戶結果 req.body : " + JSON.stringify(req.body, null, 2)});
        res.send("<h1> 綠界付款中,請回到原畫面 </h1>");
    } catch (error) {
        console.error("[getResultClientPageHtml] 失敗 : ", error);
        res.status(500).json({ error: "[getResultClientPageHtml]  失敗 : " + error });
    }
}



