

//const admin = require('firebase-admin');
//admin.firestore().collection('Booking').get().then ...
const db = require('../../firestore');

const logger = (message, data) => {
  console.log(`[${new Date().toISOString()}] ${message}`, data);
};

const errorLogger = (message, error) => {
  console.error(`[${new Date().toISOString()}] ${message}`, error);
};


/*
 * 取得 今日剩餘比率資訊
     剩餘 / 空間總數 => 小數點
*/
exports.getTodayRemanent = async (req, res) => {
  try {
      console.log("[getTodayRemanent] api 開始, req.params : ", req.params);
      const result = {remanent: 4, totalRoom: 7};
      console.log("[getTodayRemanent] api 成功, result : ", result);
      res.status(200).json(result);
  } catch (error) {
      console.error("[getTodayRemanent] api Error:", error);
      res.status(500).json({ result: '500', error: error.message });
  }
}


/*
   * 取得 booking 每日剩餘空間 
   * 資料格式:
   * 
    [
      {date:"2024-3-15", rate: 10},
      {date:"2024-3-3", rate: 20},
    ];
*/
exports.getBookingRateList = async (request, response) => {
  //取得 月份, room type 參數
  let roomType = request.params.roomType || "all";
  let date = request.params.date || "2024-3-3";
  const currentDate = new Date(date);
  const month = currentDate.getMonth() + 1;
  db.collection('Booking')
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
              && (booking.roomType === roomType || roomType === "all");
      });
      const lastDate = (new Date(2024, month, 0)).getDate();
      // 逐日計算 :)
      const totalRoom = 3;
      let resultList = [];
      for (let i = 0; i < lastDate; i++) {
          let bookingCounter = 0;
          bookingListFilter.forEach(booking => {
              if (i + 1 === (new Date(booking.startDate)).getDate()) {
                  bookingCounter++;
              }
          });
          let result = {
              date: "2024-" + month + "-" + (i + 1),
              rate: new Number(((totalRoom - bookingCounter) / totalRoom) * 100).toFixed(2),
          };
          resultList.push(result);
      }
      response.send(resultList);
  });
}

/*
   * 取得 [空間總覽] [借用資訊] api 
    roomCount: (6) [0, 0, 0, 0, 3, 3, _chartjs: {…}, push: ƒ, pop: ƒ, shift: ƒ, splice: ƒ, …]
    siteCount: (6) [0, 0, 0, 0, 2, 6, _chartjs: {…}, push: ƒ, pop: ƒ, shift: ƒ, splice: ƒ, …]
    timeTitle: (6) ['11月', '12月', '13月', '14月', '15月', '16月']
*/
exports.getRviewRoomChartByTimeType = async (request, response) => {
    logger("[getRviewRoomChartByTimeType] api 開始", request.body);
    try {
        const timeType = request.params.timeType || "halfYear";
      
        //admin.firestore().collection('Booking')
        db.collection('Booking')
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
                timeTitle: [] ,
                roomCount: [] ,
                siteCount: [] ,
                roomId: [] 
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
            
            logger("[getRviewRoomChartByTimeType] api 結束, arr : ", arr);
            response.status(200).send(arr);
          })
          .catch(err => {
            response.send('[getRviewRoomChartByTimeType] api Error getting documents' + err);
          });
        //////////////////////////////////////////////////////////
        
        //logger("[getRviewRoomChartByTimeType] 成功", result);
        //response.status(200).send(result);
    } catch (error) {
        errorLogger("[getRviewRoomChartByTimeType] api 失敗", error);
        response.status(500).json({ error: "發送驗證碼失敗" });
    }
};
/*
 * 確認 該日期是否在範圍內
 */
function isInTimeRange(timeInterval, index, date, startdate) {
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





