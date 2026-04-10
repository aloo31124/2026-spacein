

import {onRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();




function handleCorsByHead(response: any) {
  //暴力解決 CORS 問題 :)
  response.set('Access-Control-Allow-Origin', '*');
  //response.set('Access-Control-Allow-Methods', 'GET');
  //response.set('Access-Control-Allow-Headers', 'Content-Type');
  response.set('Access-Control-Max-Age', '3600');
}



////////////////////////////////////////////////////////////////////////////////////////////////////////

// 取得 ECPay 畫面
// 02/28
export const getECPaySelectPlanPage = onRequest((request, response) => {
  handleCorsByHead(response);
  let payment = handleParameter(request);
  const htmlFormData = getECPayFormPostDataBySDK(payment);
  response.send(htmlFormData); 
});



export const getECPayResult = onRequest(async (request, response)=> {
  handleCorsByHead(response);
  let payment = handleParameter(request);
  const htmlFormData = getECPayFormPostDataBySDK(payment);

  ///////////////////////////////////////////////////////// 
  const cheerio = require('cheerio');
  const $ = cheerio.load(htmlFormData);
  const MerchantTradeNo = $('input[name="MerchantTradeNo"]').val();
  const MerchantTradeDate = $('input[name="MerchantTradeDate"]').val();
  const TotalAmount = $('input[name="TotalAmount"]').val();
  const TradeDesc = $('input[name="TradeDesc"]').val();
  const ItemName = $('input[name="ItemName"]').val();
  const ReturnURL = $('input[name="ReturnURL"]').val();
  const ClientBackURL = $('input[name="ClientBackURL"]').val();
  const ChoosePayment = $('input[name="ChoosePayment"]').val();
  const PlatformID = $('input[name="PlatformID"]').val();
  const MerchantID = $('input[name="MerchantID"]').val();
  const InvoiceMark = $('input[name="InvoiceMark"]').val();
  const IgnorePayment = $('input[name="IgnorePayment"]').val();
  const DeviceSource = $('input[name="DeviceSource"]').val();
  const EncryptType = $('input[name="EncryptType"]').val();
  const PaymentType = $('input[name="PaymentType"]').val();
  const CheckMacValue = $('input[name="CheckMacValue"]').val();

  const formData = new FormData();
  formData.append('MerchantTradeNo', MerchantTradeNo);
  formData.append('MerchantTradeDate', MerchantTradeDate);
  formData.append('TotalAmount', TotalAmount);
  formData.append('TradeDesc', TradeDesc);
  formData.append('ItemName', ItemName);
  formData.append('ReturnURL', ReturnURL);
  formData.append('ClientBackURL', ClientBackURL);
  formData.append('ChoosePayment', ChoosePayment);
  formData.append('PlatformID', PlatformID);
  formData.append('MerchantID', MerchantID);
  formData.append('InvoiceMark', InvoiceMark);
  formData.append('IgnorePayment', IgnorePayment);
  formData.append('DeviceSource', DeviceSource);
  formData.append('EncryptType', EncryptType);
  formData.append('PaymentType', PaymentType);
  formData.append('CheckMacValue', CheckMacValue);

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  //response.send("cheerio yo2 CheckMacValue : " + CheckMacValue);

  /////////////////////////////////////////////////////////

  const axios = require("axios");
  axios.post('https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5',formData, {headers: headers})
    .then((reslut:any) => {
      response.send(reslut.data);
    })
    .catch((error:any) => {
      response.send("error" + error);
    });

});

function handleParameter(request: any) {
  const paymentList = [
    {planType: "studio", planTimeType: "month", cost: "1500", planName: "小型工作室優惠方案(月繳)", planDesc: "適合小型工作室，小巧方便。"},
    {planType: "studio", planTimeType: "year", cost: "15000", planName: "小型工作室優惠方案(年繳)", planDesc: "適合小型工作室，小巧方便。"},
    {planType: "group", planTimeType: "month", cost: "4000", planName: "成長中團隊優惠方案(月繳)", planDesc: "適合成長中的團隊，具有高度彈性與發展潛力。"},
    {planType: "group", planTimeType: "year", cost: "41000", planName: "成長中團隊優惠方案(年繳)", planDesc: "適合成長中的團隊，具有高度彈性與發展潛力。"},
    {planType: "enterprise", planTimeType: "month", cost: "6000", planName: "大型組織企業優惠方案(月繳)", planDesc: "適合發展成熟的大型企業，長期穩定。"},
    {planType: "enterprise", planTimeType: "year", cost: "60000", planName: "大型組織企業優惠方案(年繳)", planDesc: "適合發展成熟的大型企業，長期穩定。"},
  ];

  let planType = "studio";
  let planTimeType = "month";
  if(request.query.planType !== null) {
    planType = request.query.planType;
  }
  if(request.query.planTimeType !== null) {
    planTimeType = request.query.planTimeType;
  }

  let payment = paymentList.find(
    (payment) => payment.planType === planType && payment.planTimeType === planTimeType
  );

  return payment;
}


function getECPayFormPostDataBySDK(payment: any) {
  // 綠界提供的 SDK
  const ecpay_payment = require('ecpay_aio_nodejs');
  //const { MERCHANTID, HASHKEY, HASHIV, HOST } = process.env;

  // SDK 提供的範例，初始化
  // https://github.com/ECPay/ECPayAIO_Node.js/blob/master/ECPAY_Payment_node_js/conf/config-example.js
  const options = {
    OperationMode: 'Test', //Test or Production
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
  const MerchantTradeDate = new Date().toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });
  TradeNo = 'test' + new Date().getTime();
  let base_param = {
    MerchantTradeNo: TradeNo, //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
    MerchantTradeDate,
    TotalAmount: payment.cost,
    TradeDesc: payment.planDesc,
    ItemName: payment.planName,
    ReturnURL: "/return",
    ClientBackURL: "https://getecpayplanpage-querqokzna-uc.a.run.app",
  };
  const create = new ecpay_payment(options);

  // 注意：在此事直接提供 html + js 直接觸發的範例，直接從前端觸發付款行為
  const html = create.payment_client.aio_check_out_all(base_param);
  return html;
}


export const getECPayPlanPage = onRequest((request, response) => {
  response.send("<h1>付款畫面 :) </h1>");
});



////////////////////////////////////////////////////////////////////////////////////////////////////////


  /*
   * 取得 [空間總覽] [借用資訊] api 
    roomCount: (6) [0, 0, 0, 0, 3, 3, _chartjs: {…}, push: ƒ, pop: ƒ, shift: ƒ, splice: ƒ, …]
    siteCount: (6) [0, 0, 0, 0, 2, 6, _chartjs: {…}, push: ƒ, pop: ƒ, shift: ƒ, splice: ƒ, …]
    timeTitle: (6) ['11月', '12月', '13月', '14月', '15月', '16月']
   */
export const getRviewRoomChartByTimeType = onRequest((request, response) => {
  handleCorsByHead(response);
  const timeType = request.query.timeType;

  admin.firestore().collection('Booking')
    .get()
    .then(snapshot => {
      let bookingList = snapshot.docs.map(doc => {
        return doc.data();
      }); 

      // 初始參數
      const currentDate = new Date();
      let countTime = 7;
      let timeInterval = "day" //時間間隔
      let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() , (currentDate.getDate() - countTime + 2));
      let startMonth = startDate.getMonth() + 1;

      if(timeType === "season") {
        countTime = 3; // 三個月
        timeInterval = "month" //時間間隔：月
        startDate = new Date(currentDate.getFullYear(), (currentDate.getMonth() + 1) - countTime , 1);
        startMonth = startDate.getMonth() + 1;
      }
      else if (timeType === "halfYear") {
        countTime = 6; // 6個月
        timeInterval = "month" //時間間隔：月
        startDate = new Date(currentDate.getFullYear(), (currentDate.getMonth() + 1) - countTime , 1);    
        startMonth = startDate.getMonth() + 1;
      }
      else if (timeType === "year") {
        countTime = 12; // 12個月
        timeInterval = "month" //時間間隔：月
        startDate = new Date(currentDate.getFullYear(), (currentDate.getMonth() + 1) - countTime , 1);     
        startMonth = startDate.getMonth() + 1;
      }
      else if (timeType === "week") {
        countTime = 7; // 7天
        timeInterval = "day" //時間間隔: 天
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() , (currentDate.getDate() - countTime + 2));
        startMonth = startDate.getMonth() + 1;
      }
      else if (timeType === "month") {
        countTime = 6; // 6週
        timeInterval = "week" //時間間隔
        let currentDay = currentDate.getDay(); // 當前星期
        // 當周星期一之日期
        let monDayDateThisWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), (currentDate.getDate() - currentDay + 1));
        // 依照每週週期, 推算第一週之星期一日期
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() , (monDayDateThisWeek.getDate() - (countTime-1)*7));
        startMonth = startDate.getMonth() + 1;
      }


      // 篩選 日期範圍, 起迄日期
      const bookingListFilter = bookingList.filter((booking) => {
        const _startDate = startDate;
        const _endDate = currentDate;
        const bookingDate = new Date(booking.startDate);
        return bookingDate >= _startDate && bookingDate <= _endDate;
      });


      let arr = {
          timeTitle : Array<string>(),
          roomCount : Array<number>(),
          siteCount : Array<number>(),
          roomId : Array<string>(),
      }

      for(let i=0; i<countTime; i++) {
        // 開始計算之 月，日
        let index = 0;
        
        if(timeInterval === "month") {
          index = (startMonth + i);
          arr.timeTitle.push(index.toString() + "月");
        }
        else if(timeInterval === "week") {
          index = startDate.getDate() + i*7;
          arr.timeTitle.push((i + 1).toString() + "週")
        }
        else if(timeInterval === "day") {
          index = startDate.getDate() + i;
          arr.timeTitle.push(index.toString());
        }
        
        arr.roomCount.push(0);
        arr.siteCount.push(0);

        bookingListFilter.forEach((item) => {
              // 不在日期範圍內, 跳過
              if(!isInTimeRange(timeInterval, index, new Date(item.startDate), startDate)){
                  return;
              }
              // 空間id
              arr.roomId[i] = "yo";
              // 教室預約 統計
              if(item.bookingType === "room"){
                ++arr.roomCount[i];
              }
              // 教室預約 統計
              if(item.bookingType === "site"){
                ++arr.siteCount[i];
              }
          })
      }
      response.send(arr);
      
    })
    .catch(err => {
      response.send('Error getting documents' + err);
    });

});

  /*
   * 確認 該日期是否在範圍內
   */
  function isInTimeRange(timeInterval:string, index:number, date:Date, startdate:Date) {
    if (timeInterval === "month") {
        //該月份第一天
        const startDate = new Date(startdate.getFullYear(), (index - 1), 1); //月份減1
        //該月份最後一天
        const endDate = new Date(startdate.getFullYear(), index, 0);
        // 當前日期 在 範圍內
        return (startDate <= date) && (date <= endDate);
    }
    else if (timeInterval === "week") {
        //該週第一天
        const startDate = new Date(startdate.getFullYear(), startdate.getMonth(), index);
        //該週最後一天
        const endDate = new Date(startdate.getFullYear(), startdate.getMonth(), index + 7);
        // 當前日期 在 範圍內
        return (startDate <= date) && (date <= endDate);
    } 
    else if (timeInterval === "day") {
        const checkDate = new Date(startdate.getFullYear(), startdate.getMonth(), index);
        return (checkDate.getTime() === date.getTime());
    }
    return false;
  }

export const getBookingRateList = onRequest((request, response) => {
  //取得 月份, room type 參數
  handleCorsByHead(response);
  let date = "";
  if(request.query.date) {
    date = request.query.date.toString();
  }
  let roomType = "all";
  if(request.query.roomType) {
    roomType = request.query.roomType.toString();
  }
  const currentDate = new Date(date);
  const month = currentDate.getMonth() + 1;
  //const ownerId = "0DDLzz8jcZGMSdEnQRMW";

  admin.firestore().collection('Booking')
    .get()
    .then(snapshot => {
      let bookingList = snapshot.docs.map(doc => {
        return doc.data();
      });

      // 篩選 日期範圍, 起迄日期
      const bookingListFilter = bookingList.filter((booking) => {
        const _startDate = new Date(currentDate.getFullYear(), month - 1, 1);
        const _endDate = new Date(currentDate.getFullYear(), month, 0);
        const bookingDate = new Date(booking.startDate);
        return (bookingDate >= _startDate && bookingDate <= _endDate)
               && (booking.roomType === roomType || roomType === "all" );
      });

      //response.send(bookingListFilter);

      const lastDate = (new Date(2024, month, 0)).getDate();

      // 逐日計算 :)
      const totalRoom = 3;
      let resultList = [];
      for(let i=0; i<lastDate; i++) {
          let bookingCounter = 0;
          bookingListFilter.forEach(booking => {
              if(i+1 === (new Date(booking.startDate)).getDate()) {
                  bookingCounter ++;
              }
          });
          let result = {
              date: "2024-" + month + "-" + (i + 1),
              rate: new Number(((totalRoom - bookingCounter) / totalRoom) * 100).toFixed(2),
          }

          resultList.push(result);
      }


      response.send(resultList);
      
    });

});


/*
 * 驗證 token 是否已過期 
 */
export const getTokenValue = onRequest(async (request, response) => {
  const currentDate = new Date();
  response.send(currentDate);
  return;
});


/* 
 * 回傳所有 教室,座位 資訊, 並有 booking 時段判斷, 若已被預約, 則註記 isbooking: true
 */
export const getRoomSiteByDate = onRequest(async (request, response) => {
  try {
    handleCorsByHead(response);
    
    const db = admin.firestore();

    const startDate = request.query.startDate || "1991-1-1";
    const startTime = request.query.startTime || "00:00";
    const endTime = request.query.endTime || "00:00";

    // 取 預約表, 並 篩選出 已經與 當前預約日期重疊之預約記錄
    const bookingSnapshot = await db.collection('Booking')
      .where('startDate', '==', startDate)
      .get();
    const bookingList = bookingSnapshot.docs.map(doc => ({
      startTime: doc.data().startTime,
      endTime: doc.data().endTime,
      siteId: doc.data().siteId,
      ...doc.data()
    }));
    const bookingFilterList = bookingList.filter(booking => 
      (new Date(startDate + " " + booking.startTime).getTime() < new Date(startDate + " " + endTime).getTime() )
      &&
      (new Date(startDate + " " + booking.endTime).getTime() > new Date(startDate + " " + startTime).getTime())
    );

    // 取 座位表
    const roomToSiteSnapshot = await db.collection('RoomToSite').get();
    const siteList = roomToSiteSnapshot.docs.map(doc => ({
      id: doc.id, // 獲取 RoomToSite 文檔 id
      roomId: doc.data().roomId,
      ...doc.data() // 獲取 RoomToSite 的其他數據
    }));

    // 取 教室表
    const roomSnapshot = await db.collection('Room').get();
    const roomList = roomSnapshot.docs.map(doc => ({
      roomId: doc.id,
      roomName: doc.data().name
    }));

    // 三表合併
    const resultList = siteList.map(site => {
      const matchRoom = roomList.find(room => room.roomId === site.roomId);
      const matchBooking = bookingFilterList.filter(booking => booking.siteId === site.id);
      if(matchRoom) {
        return {...site, ...matchRoom, isBooking: (matchBooking.length > 0)};
      }
      else {
        return site;
      }
    });
    response.send(resultList);
    return;
  } catch (error) {
    response.send(error);
    return;
  }
});






