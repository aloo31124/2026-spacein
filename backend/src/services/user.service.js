const User = require('../models/user.model');
const UserToRole = require('../models/userToRole.model');
const UserToOwner = require('../models/userToOwner.model');

const logger = (message, data) => {
    console.log(`[${new Date().toISOString()}] ${message}`, data);
};

const errorLogger = (message, error) => {
    console.error(`[${new Date().toISOString()}] ${message}`, error);
};

exports.findByMail = async (email) => {
    try {
        return await User.findByMail(email);
    } catch (error) {
        console.error("[findByMail] Error:", error);
    }
}

/* 匯出全部使用者 */
exports.getUserExportList = async () => {
    try {
        return await User.getAllUserList();
    } catch (error) {
        console.error("[getUserExportList] Error:", error);
    }
}

/* 取得使用者資訊, 依 account */
exports.getUserByAccount = async (account) => {
    logger("[getUserByAccount] 開始", { account });
    try {
        const user = await User.findByAccount(account);
        if (!user) {
            logger("[getUserByAccount] 查無此帳號", { account });
            return null;
        }
        logger("[getUserByAccount] 成功", user);
        return user;
    } catch (error) {
        errorLogger("[getUserByAccount] 失敗", error);
        throw new Error("取得使用者資訊失敗");
    }
};

/* 新增使用者 */
exports.addUser = async (user) => {
    logger("[addUser] 開始", { email: user.email });
    try {
        const existingUser = await User.findByMail(user.email);
        if (existingUser) {
            logger("[addUser] 該信箱已註冊", { email: user.email });
            return null;
        }
        const newUser = await User.create(user);
        logger("[addUser] 成功", newUser);
        return newUser;
    } catch (error) {
        errorLogger("[addUser] 失敗", error);
        throw new Error("新增使用者失敗");
    }
};

/* 更新使用者資訊 */
exports.updateUser = async (user) => {
    logger("[updateUser] 開始", { email: user.email });
    try {
        const existingUser = await User.findByMail(user.email);
        if (!existingUser) {
            logger("[updateUser] 查無此信箱使用者", { email: user.email });
            return null;
        }
        const { ref, ...userData } = existingUser;
        const updatedUser = await User.update(ref, user);
        logger("[updateUser] 成功", updatedUser);
        return updatedUser;
    } catch (error) {
        errorLogger("[updateUser] 失敗", error);
        throw new Error("更新使用者資訊失敗");
    }
};

/* 登入 */
exports.login = async (email, password) => {
    logger("[login] 開始", { email });
    try {
        const user = await User.findByMail(email);
        if (!user) {
            logger("[login] 查無此帳號", { email });
            return false;
        }

        if (user.password !== password) {
            logger("[login] 密碼錯誤", { email });
            return false;
        }

        logger("[login] 成功", { email });
        return true;
    } catch (error) {
        errorLogger("[login] 失敗", error);
        throw new Error("登入失敗");
    }
};


/* 搜尋使用者 */
exports.searchUserList = async (user) => {
    try {
        const pagingParam = { pageIndex: 1, pageSize: 1000, sort: "asc", pageTotal:-1, dataTotal:-1 };
        const userList = await User.search(user, pagingParam);
        console.log(`[搜尋結果]`, JSON.stringify(userList, null, 2));
        return userList;
    } catch (error) {
        console.error(`[searchUserList] 發生錯誤:`, error.message);
        throw new Error(`搜尋失敗: ${error.message}`);
    }
};


/* 搜尋 [預約者], 合併 預約者 與 擁有者 資訊 */
exports.joinBookerOwnerInfo = async (user, ownerId) => {
    try {
        console.log(`[joinBookerOwnerInfo] 開始 user, ownerId : `, user, ownerId);

        // 檢查是否為 擁有者 owner
        const userToRole = await UserToRole.findByUserId(ownerId);
        if(!userToRole || !userToRole.role || userToRole.role !== 'owner') {
            console.error("當前使用者 不為 擁有者");
            return "當前使用者 不為 擁有者";
        }

        // 查詢所有使用者
        const pagingParam = { pageIndex: 1, pageSize: 1000, sort: "asc", pageTotal:-1, dataTotal:-1 };
        const userList = (await User.search(user, pagingParam)).userList;
        
        // 查詢 owner 下的 預約者booker
        const userToOwnerList =  await UserToOwner.findByOwnerId(ownerId);
        // 查詢 owner 資訊
        const owner = await User.find(ownerId);

        // join 合併, 預約者 與 擁有者
        return userToOwnerList.map(userToOwner => {
            const user = userList.find(user =>  user.id === userToOwner.userId);
            if(!user) return null;
            return {
                ownerId: owner.id,
                ownerName: owner.name,
                ownerEmail: owner.email,
                ...user,
            }
        })
        .filter(userToOwner => userToOwner !== null);
    } catch (error) {
        console.error(`[joinBookerOwnerInfo] 發生錯誤:`, error.message);
        throw new Error(`[joinBookerOwnerInfo]: ${error.message}`);
    }
}


