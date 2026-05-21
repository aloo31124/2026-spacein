// 綠界提供的 SDK
const ecpay_payment = require('ecpay_aio_nodejs');
const Payment = require('../models/payment.model');
const PaymentHistory = require('../models/paymentHistory.model');
const UserToPayment = require('../models/userToPayment.model');

/* 取得 全部 購買方案 */
exports.getAllPaymentList = async () => {
    try {
        return await Payment.getAllPaymentList();
    } catch (error) {
        console.error("[getAllPaymentList] Error:", error);
    }
}
/* 查詢方案, 依照 paymentid */
exports.find = async (paymentId) => {
    try {
        return await Payment.find(paymentId);
    } catch (error) {
        console.error("[find] Error:", error);
    }
}


exports.getPaySelectPageHtml = async (payment, userId) => {
  //const { MERCHANTID, HASHKEY, HASHIV, HOST } = process.env;
  // SDK 提供的範例，初始化
  // https://github.com/ECPay/ECPayAIO_Node.js/blob/master/ECPAY_Payment_node_js/conf/config-example.js
  const options = {
      OperationMode: 'Test',
      MercProfile: {
          MerchantID: "3002599",
          HashKey: "***REMOVED***",
          HashIV: "hT5OJckN45isQTTs",
      },
      IgnorePayment: [
      //    "Credit",
      //    "WebATM",
      //    "ATM",
      //    "CVS",
      //    "BARCODE",
      //    "AndroidPay"
      ],
      IsProjectContractor: false,
  };
  //////////////////////////////////////////
  // SDK 提供的範例，參數設定
  // https://github.com/ECPay/ECPayAIO_Node.js/blob/master/ECPAY_Payment_node_js/conf/config-example.js
  let TradeNo;
  // ECPay 要求 MerchantTradeDate 必須為「yyyy/MM/dd HH:mm:ss」格式，且使用台北時區 (UTC+8)
  const pad = (n) => String(n).padStart(2, '0');
  const nowTaipei = new Date(Date.now() + 8 * 60 * 60 * 1000);
  const MerchantTradeDate =
      `${nowTaipei.getUTCFullYear()}/${pad(nowTaipei.getUTCMonth() + 1)}/${pad(nowTaipei.getUTCDate())} ` +
      `${pad(nowTaipei.getUTCHours())}:${pad(nowTaipei.getUTCMinutes())}:${pad(nowTaipei.getUTCSeconds())}`;
  TradeNo = 'test' + new Date().getTime();
  // 取得 雲函式 url
  //const cloud_return_url = process.env.CLOUD_RUNTIME_URL || "http:localhost:8082";
  //const cloud_return_url = `https://${process.env.FUNCTION_REGION}-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/${process.env.FUNCTION_NAME}`;
  //const cloud_return_url = "http://localhost:8082";
  //const cloud_return_url = "https://api-usmvmcr5xa-uc.a.run.app"; // aloo.copy0
  const cloud_return_url = "https://api-2qiy7ro3ea-uc.a.run.app"; // spacein3 openloulou
  //const cloud_return_url = "https://api-udx6hqtnmq-uc.a.run.app"; // speceincopy2 openloulou

  let base_param = {
      MerchantTradeNo: TradeNo,
      MerchantTradeDate,
      TotalAmount: payment.cost,
      TradeDesc: payment.planDesc,
      ItemName: payment.planName,
      // 給綠界 客製欄位
      CustomField1: userId,
      CustomField2: payment.id,
      // 付款後, 重新導向
      ReturnURL: `${cloud_return_url}/api/pay/ecpay/pay/result/server`,
      ClientBackURL: `${cloud_return_url}/api/pay/ecpay/pay/result/client`,
  };
  const create = new ecpay_payment(options);
  // 注意：在此事直接提供 html + js 直接觸發的範例，直接從前端觸發付款行為
  const html = create.payment_client.aio_check_out_all(base_param);
  return html;
}


exports.addPaymentHistory = async (history) => {
    try {
        PaymentHistory.add(history);
    } catch (error) {
        console.error(`[addPaymentHistory] 異常 : ${error}`);
    }
}

/** 更新(新增) 使用者 購買方案 */
exports.addUserToPayment = async (userId, paymentId) => {
    try {
        const payment = await Payment.find(paymentId);
        const purchaseDate = new Date().toISOString();
        const createAt = new Date().toISOString();
        let _expiryDate = new Date();
        switch (payment.planTimeType) {
            case '1day':
                _expiryDate.setDate(_expiryDate.getDate() + 1);
                break;
            case '2day':
                _expiryDate.setDate(_expiryDate.getDate() + 2);
                break;
            case '7day':
                _expiryDate.setDate(_expiryDate.getDate() + 7);
                break;
            case 'month':
                _expiryDate.setMonth(_expiryDate.getMonth() + 1);
                break;
            case 'season':
                _expiryDate.setMonth(_expiryDate.getMonth() + 3);
                break;
            case 'year':
                _expiryDate.setFullYear(_expiryDate.getFullYear() + 1);
                break;
            default:
                throw new Error('無效的 planTimeType');
        }
        const expiryDate = _expiryDate.toISOString();
        return await UserToPayment.add({userId, paymentId, expiryDate, purchaseDate, createAt});
    } catch (error) {
        console.error(`[addUserToPayment] 異常 : ${error}`);
    }
}



