const authService = require('../services/auth.service');
const userService = require('../services/user.service');

const logger = (message, data) => {
    console.log(`[${new Date().toISOString()}] ${message}`, data);
};

const errorLogger = (message, error) => {
    console.error(`[${new Date().toISOString()}] ${message}`, error);
};

/* 寄送驗證碼 */
exports.registMail = async (req, res) => {
    logger("[registMail] 開始", req.body);
    try {
        const result = await authService.sendVerifyCode(req.body.email);
        logger("[registMail] 成功", result);
        res.status(200).send({result});
    } catch (error) {
        errorLogger("[registMail] 失敗", error);
        res.status(500).json({ error: "發送驗證碼失敗" });
    }
};

/* 註冊建立使用者 */
exports.registAddUser = async (req, res) => {
    logger("[registAddUser] 開始", req.body);
    try {
        const newUser = await authService.addAccount(req.body.email);
        logger("[registAddUser] 成功", newUser);
        res.status(200).json({ newUser });
    } catch (error) {
        errorLogger("[registAddUser] 失敗", error);
        res.status(500).json({ error: "註冊失敗" });
    }
};

/* 註冊使用者更新資訊 */
exports.registUserUpdate = async (req, res) => {
    logger("[registUserUpdateInfot] 開始", req.body);
    try {
        const newUser = await authService.updateAccount(req.body.newUser);
        logger("[registUserUpdateInfot] 成功", newUser);
        res.status(200).json({ newUser });
    } catch (error) {
        errorLogger("[registUserUpdateInfot] 失敗", error);
        res.status(500).json({ error: "更新使用者資訊失敗" });
    }
};

/* 註冊輸入驗證碼 */
exports.registVerityCode = async (req, res) => {
    logger("[registVerityCode] 開始", req.body);
    try {
        const verifyResult = authService.verifyCode(req.body.newUser);
        logger("[registVerityCode] 成功", verifyResult);
        res.status(200).json({ verifyResult });
    } catch (error) {
        errorLogger("[registVerityCode] 失敗", error);
        res.status(500).json({ error: "驗證碼錯誤" });
    }
};

/* 註冊使用者更新密碼 */
exports.registUserUpdatePassword = async (req, res) => {
    logger("[registUserUpdatePassword] 開始", req.body);
    try {
        const newUser = await authService.updateAccount(req.body.newUser);
        logger("[registUserUpdatePassword] 成功", newUser);
        res.status(200).json({ newUser });
    } catch (error) {
        errorLogger("[registUserUpdatePassword] 失敗", error);
        res.status(500).json({ error: "密碼更新失敗" });
    }
};

/* 登入 */
exports.login = async (req, res) => {
    logger("[login] 開始", { email: req.body.email });
    try {
        const { email, password } = req.body;
        const isSuccess = await authService.login(email, password);
        if (!isSuccess) {
            logger("[login] 失敗, 帳密錯誤", email);
            return res.status(401).json({ isSuccess, message: "登入失敗, 帳密錯誤" });
        }
        const token = await authService.createJwtToken(req);
        logger("[login] 成功", { email });
        res.status(200).json({ isSuccess, message: "帳密登入成功", token });
    } catch (error) {
        errorLogger("[login] 失敗", error);
        res.status(500).json({
            isSuccess: null,
            message: "登入服務暫時無法使用，請稍後再試"
        });
    }
};

/* 登出, 清除 token */
exports.logout = async (req, res) => {
    logger("[logout] 開始", req.headers.authorization);
    try {
        const success = authService.logout(req);
        logger("[logout] 成功", success);
        res.status(200).json({ success, message: "已成功登出" });
    } catch (error) {
        errorLogger("[logout] 失敗", error);
        res.status(500).json({ error: "登出失敗" });
    }
};

/* 驗證 jwt */
exports.verifyJwt = async (req, res) => {
    logger("[verifyJwt] 開始", req.headers.authorization);
    try {
        const payload = authService.verifyJwt(req);
        if (!payload) {
            logger("[verifyJwt] 失敗, 無效或過期 token", null);
            return res.status(401).json({ payload, error: '無效或過期之 token' });
        }
        logger("[verifyJwt] 成功", payload);
        res.status(200).json({ payload, message: "成功訪問資源" });
    } catch (error) {
        errorLogger("[verifyJwt] 失敗", error);
        res.status(500).json({ error: "JWT 驗證失敗" });
    }
};

/** 檢查使用者帳號
 *      google 授權後檢查 
 */
exports.getUserByEmail = async (req, res) => {
    logger("[getUserByEmail] 開始, req.params.email : ", req.params.email);
    try {
        const user = await userService.findByMail(req.params.email);
        res.status(200).json({ result: { user } });
    } catch (error) {
        errorLogger("[getUserByEmail] 失敗", error);
        res.status(500).json({ error: "[getUserByEmail] 失敗" });
    }
}
