const db = require('../firestore');
const Fuse = require('fuse.js');
const COLLECTION_NAME = 'Payment';

class Payment {
    constructor(id, cost, planDesc, planName, planTimeType, planType, siteTotal) {
        this.id = id;
        this.cost = cost;
        this.planDesc = planDesc;
        this.planName = planName;
        this.planTimeType = planTimeType;
        this.planType = planType;
        this.siteTotal = siteTotal;
    }

    /* [系統管理] 搜尋 [方案]  */
    static async search(planName, planTimeType, planType) {
        //let { pageIndex, pageSize, sort, pageTotal, dataTotal } = pagingParam; // 分頁參數
        let sort = "planName";
        let query = db.collection(COLLECTION_NAME);
        const snapshot = await query.get();
        let paymentList = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        
        // 進行模糊搜尋 (使用 Fuse.js )
        /*
        if(planName && planName !== 'all') {
            const fuse = new Fuse(paymentList, {
                keys: ['planName'],
                threshold: 0.2, // 設定匹配度（0 完全匹配，1 模糊匹配）
                includeScore: false,
            });
            paymentList = fuse.search(planName).map(result => result.item);
        }
        */

        // 必要條件搜尋
        paymentList = paymentList
            .sort((a, b) => a[sort] > b[sort] ? 1 : -1)
            .filter(payment => 
                (planType ? (planType === 'all' || payment.planType === planType) : true)
                && (planTimeType ? (planTimeType === 'all' || payment.planTimeType === planTimeType) : true)
                && (planName ? (planName === 'all' || payment.planName.includes(planName)) : true)
            )
        /*
        // 分頁設定
        dataTotal = (bookingList.length);
        pageTotal = Math.ceil(bookingList.length / pageSize);
        bookingList = bookingList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
        return {bookingList, pagingParam:{...pagingParam, pageTotal, dataTotal}};
        */
        return paymentList;
    }

    /** 查詢方案, 依照 paymentid */
    static async find(id) {
        const doc = await db.collection(COLLECTION_NAME).doc(id).get();
        if (!doc.exists) {
            console.log('找無此 方案');
            return null;
        }
        console.log("取得 方案 : ", {id: doc.id, ...doc.data()});
        return {id: doc.id, ...doc.data()};
    }
    
    /* 新增 [方案] */
    static async add(payment) {
        const docRef = await db.collection(COLLECTION_NAME).add(payment);
        const docSnapshot = await docRef.get();
        console.log(" 新增 [方案] : ", {id: docRef.id, ...docSnapshot.data()});
        return ({id: docRef.id, ...docSnapshot.data()})
    }

    /* 更新 [方案] */
    static async update(payment) {
        const docRef = db.collection(COLLECTION_NAME).doc(payment.id);
        let {id, ..._payment} = payment;
        await docRef.update(_payment);
        console.log("更新後 [方案]  : ", payment);
        return payment;
    }

    /* 刪除 [方案] */
    static async delete(id) {
        const docRef = db.collection(COLLECTION_NAME).doc(id);
        await docRef.delete();
        console.log("刪除 [方案] : ", id);
        return id;
    }
     
    // 取得所有 方案費用 資訊
    static async getAllPaymentList() {
        const snapshot = await db.collection(COLLECTION_NAME).get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return new Payment(
                doc.id,
                data.cost || "無 cost",
                data.planDesc || "無 planDesc",
                data.planName || "無 planName",
                data.planTimeType || "無 planTimeType",
                data.planType || "無 planType",
                data.siteTotal || "無 siteTotal",
            );
        });
    }

    // 匯入 所有 付費方案 進入空表, 不卡控, 使用於備份還原。
    static async importAllPayment(paymentList) {
        try {
            // 檢查表是否已存在資料
            const snapshot = await db.collection(COLLECTION_NAME).limit(1).get();
            if (!snapshot.empty) {
                console.log('[importAllPayment]: 表已存在資料，匯入中止。');
                return { message: '表已存在資料，匯入中止。' };
            }

            // 表無資料，開始匯入
            const batch = db.batch();
            paymentList.forEach(paymentData => {
                const payment = new Payment(
                    paymentData.id.replace(/"/g, ''),
                    paymentData.cost.replace(/"/g, ''),
                    paymentData.planDesc.replace(/"/g, ''),
                    paymentData.planName.replace(/"/g, ''),
                    paymentData.planTimeType.replace(/"/g, ''),
                    paymentData.planType.replace(/"/g, ''),
                );
                const docRef = db.collection(COLLECTION_NAME).doc(payment.id);
                batch.set(docRef, {
                    cost: payment.cost,
                    planDesc: payment.planDesc,
                    planName: payment.planName,
                    planTimeType: payment.planTimeType,
                    planType: payment.planType,
                });
            });

            await batch.commit();
            console.log('[importAllPayment]: 資料匯入成功。');
            return { message: '資料匯入成功。' };
        } catch (error) {
            console.error('[importAllPayment] error:', error);
            throw error;
        }
    }
}
module.exports = Payment;