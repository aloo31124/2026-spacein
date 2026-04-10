/*
 *  伺服器入口, 處理路由, swagger
 */

// 引入套件
const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const functions = require('firebase-functions');

// 引入自訂的 logger
require('./utils/logger');  // 當應用啟動時，logger 就會生效

// api, 控制器 引入
const fixDataApiController = require('./controllers/manager/fixData.api.controller');
const authApiController = require('./controllers/auth.api.controller');
const accountApiController = require('./controllers/account.api.controller');
const ecpayApiController = require('./controllers/pay/ecpay.api.controller');
const bookingApiController = require('./controllers/booking/booking.api.controller');
const reviewRoomApiController = require('./controllers/reviewRoom/reviewRoom.api.controler');
const backApiController = require('./controllers/manager/backup.api.controller');

const managerRoomApiController = require('./controllers/manager/managerRoom.api.controller');
const managerSystemApiController = require('./controllers/manager/managerSystem.api.controller');

// 設定 express app 相關設定
const app = express();
app.use(cors());
// 設定 Express 支援 JSON 和 URL Encoded 資料
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 文件上傳



// Swagger 設定
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'NewShop API',
            description: 'NewShop API Information',
            contact: {
                name: 'Amazing Developer'
            },
            servers: ['http://localhost:8081']
        }
    },
    apis: ['./controllers/*.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


/* 路由設定 */
// [修資料]
//app.get('/api/manager/fix/user/id', fixDataApiController.fixUserIdField);
//app.get('/api/manager/fix/booking/error/endDate', fixDataApiController.fixBookingErrorFieldendDate);
//app.get('/api/manager/fix/booking/error/UserId', fixDataApiController.fixBookingErrorFieldUserId);
// [註冊] 登入驗證  api
app.post('/api/auth/login', authApiController.login);
app.post('/api/auth/logout', authApiController.logout);
app.post('/api/auth/jwt', authApiController.verifyJwt);
app.post('/api/auth/regist/mail', authApiController.registMail);
app.post('/api/auth/regist/user/add', authApiController.registAddUser);
app.post('/api/auth/regist/user/update', authApiController.registUserUpdate);
app.post('/api/auth/regist/user/password', authApiController.registUserUpdatePassword);
app.post('/api/auth/regist/verify/code', authApiController.registVerityCode);
app.get('/api/auth/user/:email', authApiController.getUserByEmail);
// [帳號] 升級, 付款
app.get('/api/account/owner/:email', accountApiController.getOwnerByEmail);
app.post('/api/account/owner/add', accountApiController.postUserToOwner);
app.post('/api/account/role/add', accountApiController.postUserToRole);
app.get('/api/account/role/:userId', accountApiController.getUserRoleByUserId);
app.get('/api/account/payment/userId/:userId', accountApiController.getUserPaymentByUserId);
app.get('/api/account/payment/select/list', accountApiController.getPaymentAll);
app.get('/api/account/payment/select/:paymentId/:userId', accountApiController.getPaySelectPageHtml);
app.get('/api/account/payment/paymentId/:paymentId', accountApiController.getPaymentByPaymentid);
//app.get('/api/account/payment/all', accountApiController.getPaymentAll);
// [空間預約]
app.get('/api/booking/all', bookingApiController.getAllBookingList);
app.get('/api/booking/room/all', bookingApiController.getAllRoom);
app.get('/api/booking/room/userId/:userId', bookingApiController.getRoomByUserId);
app.get('/api/booking/roomtosite/all', bookingApiController.getAllSite);
app.get('/api/booking/roomtosite/:startDate/:startTime/:endTime', bookingApiController.getRoomToSiteByDate);
app.post('/api/booking/add', bookingApiController.postBooking);
app.delete('/api/booking/delete/:bookingId', bookingApiController.deleteBooking);
// [檢視空間]
app.get('/api/review/room/rate/today', reviewRoomApiController.getTodayRemanent);
app.get('/api/review/room/rate/:roomType/:date', reviewRoomApiController.getBookingRateList);
app.get('/api/review/room/chart/:timeType', reviewRoomApiController.getRviewRoomChartByTimeType);


// [空間管理] 匯入 [教室座位]
app.post('/api/manager/room/site/import/:ownerId', managerRoomApiController.importRoomJoinSiteByOwnerId);
// [空間管理] 教室管理
app.post('/api/manager/room/export/all/:ownerId', managerRoomApiController.exportRoom);
app.post('/api/manager/room/search/:ownerId', managerRoomApiController.searchRoom);
app.post('/api/manager/room/add/:ownerId', managerRoomApiController.addRoom);
app.patch('/api/manager/room/update/:ownerId', managerRoomApiController.updateRoom);
app.delete('/api/manager/room/delete/:ownerId/:id', managerRoomApiController.deleteRoom);
// [空間管理] 座位管理
app.post('/api/manager/room/site/search/:ownerId', managerRoomApiController.searchSiteJoinRoomInfo);
app.post('/api/manager/room/site/add/:ownerId', managerRoomApiController.addSite);
app.patch('/api/manager/room/site/update/:ownerId', managerRoomApiController.updateSite);
app.delete('/api/manager/room/site/delete/:ownerId/:id', managerRoomApiController.deleteSite);
// [空間管理] 預約者
app.post('/api/manager/room/booker/search/:ownerId', managerRoomApiController.searchbookerUser);
app.post('/api/manager/room/booker/export/all/:ownerId', managerRoomApiController.searchbookerUser);
// [空間管理] 預約紀錄
app.post('/api/manager/room/booking/search/:ownerId', managerRoomApiController.searchBooking);


// [系統管理] 使用者
app.post('/api/manager/system/user/search', managerSystemApiController.searchUser);
// [系統管理] [使用者角色]
app.post('/api/manager/system/user/role/search', managerSystemApiController.searchUserRole);
// [系統管理] [使用者方案]
app.post('/api/manager/system/user/payment/search', managerSystemApiController.searchUserPayment);
// [系統管理] 金流紀錄
app.post('/api/manager/system/payment/record/search', managerSystemApiController.searchPayRecord);
// [系統管理] 金流方案設定
app.get('/api/manager/system/payment/export/all', managerSystemApiController.exportPayment);
app.post('/api/manager/system/payment/search/:planName/:planTimeType/:planType', managerSystemApiController.searchPayment);
app.post('/api/manager/system/payment/add', managerSystemApiController.postPayment);
app.patch('/api/manager/system/payment/update', managerSystemApiController.patchPayment);
app.delete('/api/manager/system/payment/delete/:id', managerSystemApiController.deletePayment);
// [系統管理] 備份
app.get('/api/manager/backup/export/payment', backApiController.getPaymentExportList);
app.get('/api/manager/backup/export/room', backApiController.getRoomExportList);
app.get('/api/manager/backup/export/roomtosite', backApiController.getRoomtositeExportList);
app.get('/api/manager/backup/export/booking', backApiController.getBookingExportList);
app.get('/api/manager/backup/export/user', backApiController.getUserExportList);
app.get('/api/manager/backup/export/usertopayment', backApiController.getUserToPaymentExportList);
app.get('/api/manager/backup/export/usertoowner', backApiController.getUserToOwnerExportList);
app.get('/api/manager/backup/export/usertopermission', backApiController.getUserToPermissionExportList);
app.post('/api/manager/backup/import/all/db', backApiController.importAllDataBaseTable);
app.patch('/api/manager/backup/import/room', backApiController.patchImportRoomList);
// ecpay api
app.post('/api/pay/ecpay/pay/result/server', ecpayApiController.postResultServer);
app.get('/api/pay/ecpay/pay/result/client', ecpayApiController.getResultClientPageHtml);

// 新思維 open api


// 處理找無路由
app.use((req, res) => {
    res.status(404).send(" spacein server api 404 Not Found, 找無此路由 :( ");
});

// 啟動伺服器
// const PORT = process.env.PORT;
const PORT = 8082;
app.listen(PORT, () => {
    console.log(`[space in] 空間預約 伺服器啟動 http://localhost:${PORT}`);
})

exports.api = functions.https.onRequest(app);
