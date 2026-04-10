const db = require('../firestore');
const Fuse = require('fuse.js');
const COLLECTION_NAME = 'User';

class User {
    constructor({name, email, authentication, 
                displayName, familyName, givenName,
                idToken, imageUrl, serverAuthCode,
                state, phone, role, pay, password, createdAt }) {
        //this.id = id || "無id";
        this.name = name || "無姓名";        
        this.email = email || "無 使用者郵箱";
        this.authentication = authentication || "無 authentication";
        this.displayName = displayName || "無 displayName";
        this.familyName = familyName || "無 familyName";
        this.givenName = givenName || "無 givenName";
        this.idToken = idToken || "無 idToken";
        this.imageUrl = imageUrl || "無 imageUrl";
        this.serverAuthCode = serverAuthCode || "無 serverAuthCode";
        // 自訂義
        this.state = state || "未設定使用者狀態";
        this.phone = phone || "無手機";
        this.role = role || "未知角色";
        this.pay = pay || "無支付方式";
        this.password = password || "無密碼";
        this.createdAt = createdAt || "無創建時間";
    }

    // 將 User 類實例轉為純對象
    toPlainObject() {
        return { ...this };
    }

    // 匯入 所有 使用者 進入空表, 不卡控, 使用於備份還原。
    static async importAllUser(userList) {
        try {
            // 檢查 Room 表是否已存在資料
            const snapshot = await db.collection(COLLECTION_NAME).limit(1).get();
            if (!snapshot.empty) {
                console.log('[importAllUser]: 資料表已存在資料，匯入中止。');
                return { message: '資料表已存在資料，匯入中止。' };
            }

            // Room 表無資料，開始匯入
            const batch = db.batch();
            userList.forEach(userData => {
                const user = new User({
                    //id: userData.id || "",
                    name: userData.name || "",
                    email: userData.email || "",
                    authentication: userData?.authentication || "",
                    displayName: userData.displayName || "",
                    familyName: userData.familyName || "",
                    givenName: userData.givenName || "",
                    idToken: userData.idToken || "",
                    imageUrl: userData.imageUrl || "",
                    serverAuthCode : userData.serverAuthCode || ""
                });
                const docRef = db.collection(COLLECTION_NAME).doc(user.id.replace(/"/g, ''));
                batch.set(docRef, {
                    name: user.name.replace(/"/g, ''),
                    email: user.email.replace(/"/g, ''),
                    authentication: user.authentication.replace(/"/g, ''),
                    displayName: user.displayName.replace(/"/g, ''),
                    familyName: user.familyName.replace(/"/g, ''),
                    givenName: user.givenName.replace(/"/g, ''),
                    idToken: user.idToken.replace(/"/g, ''),
                    imageUrl: user.imageUrl.replace(/"/g, ''),
                    serverAuthCode: user.serverAuthCode.replace(/"/g, ''),
                });
            });

            await batch.commit();
            console.log('[importAllUser]: 資料匯入成功。');
            return { message: '資料匯入成功。' };
        } catch (error) {
            console.error('[importAllUser] error:', error);
            throw error;
        }
    }


    // 取得所有使用者資訊, 完整資訊
    static async getAllUserList() {
        const snapshot = await db.collection(COLLECTION_NAME).get();
        
        if (snapshot.empty) {
            return []; // 若無資料則回傳空陣列
        }

        // 轉換 Firestore Document 為 JSON 陣列
        const userList = snapshot.docs.map(doc => {
            let user = doc.data();
            if(user.authentication) {
                user.authentication = JSON.stringify(user.authentication).trim().replace(/"/g, '');
            }
            return {
                id: doc.id, // Firestore 自動生成的 document ID
                ...user
            }
        });

        return userList;
    }

    /*
    // 取得所有 使用者資訊
    static async getAllUserList() {
        const snapshot = await db.collection(COLLECTION_NAME).get();
        const userList = snapshot.docs.map(doc => {
            const data = doc.data();
            return new UserModel(
                data.id || "無id",
                data.name || "無姓名",              // 使用者帳號
                data.email || "無使用者郵箱",         // 使用者郵箱
                data.state || "未設定使用者狀態",    // 使用者狀態
                data.phone || "無手機",             // 使用者電話號碼
                data.role || "未知角色",                // 使用者角色
                data.pay || "無支付方式",           // 支付方式
                data.password || "無密碼",         // 密碼
                data.createdAt || "無創建時間"       // 創建時間
            );
        });
        return userList;
    }
    */
   static async find(id) {
        const doc = await db.collection(COLLECTION_NAME).doc(id).get();
        if (!doc.exists) {
            console.log('使用者 不存在 ');
            return null;
        }
        console.log("使用者 資訊 : ", {id: doc.id, ...doc.data()});
        return {id: doc.id, ...doc.data()};
   }

    static async findByAccount(name) {
        const snapshot = await db.collection(COLLECTION_NAME).where('name', '==', name).get();
        return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }

    static async findByMail(email) {
        const snapshot = await db.collection(COLLECTION_NAME).where('email', '==', email).get();
        return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data(), ref: snapshot.docs[0].ref };
    }

    // 查詢符合條件的使用者
    static async search(user, pagingParam) {
        const { name, state, email } = user;
        let { pageIndex, pageSize, sort, pageTotal, dataTotal } = pagingParam; // 分頁參數
        //const pageIndex = 1;const pageSize = 3;const sort = 'name' ; // 分頁參數
        let query = db.collection(COLLECTION_NAME);
        const snapshot = await query.get();
        let userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // 使用 Fuse.js 進行模糊搜尋
        /*
        if(name) { // google帳號 姓名
            const fuse = new Fuse(userList, {
                keys: ['name'],
                threshold: 0.3, // 設定匹配度（0 完全匹配，1 模糊匹配）
                includeScore: false,
            });
            userList = fuse.search(name).map(result => result.item);
        }
        */
        userList = userList
            .sort((a, b) => a[sort] > b[sort] ? 1 : -1)
            .filter(result => 
                (state ? result.state === state : true)
                && (name ? result.name.includes(name) : true)
                && (email ? result.email.includes(email) : true)
            )
        
        // 分頁設定
        dataTotal = (userList.length);
        pageTotal = Math.ceil(userList.length / pageSize);
        userList = userList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

        return {userList, pagingParam:{...pagingParam, pageTotal, dataTotal}};
    }

    static async create(user) {
        const docRef = await db.collection(COLLECTION_NAME).add(user);
        const docSnapshot = await docRef.get();
        return { id: docRef.id, ...docSnapshot.data() };
    }

    static async update(userRef, fieldsToUpdate) {
        await userRef.update(fieldsToUpdate);
        const updatedSnapshot = await userRef.get();
        return { id: userRef.id, ...updatedSnapshot.data() };
    }
}

module.exports = User;

