const backupService = require('../../services/backup.service');
const paymentService = require('../../services/payment.service');
const userService = require('../../services/user.service');
const userToPaymentService = require('../../services/userToPayment.service');
const userToOwnerService = require('../../services/userToOwner.service');
const userToPermissionService = require('../../services/userToPermission.service')
const bookingService = require('../../services/booking.service');
const roomtositeService = require('../../services/roomToSite.service')

exports.getPaymentExportList = async (req, res) => {
    try {
        res.status(200).json({ result: '200', exportList: await paymentService.getPaymentExportList() });
    } catch (error) {
        console.error("[getPaymentExportList] Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
};

exports.getUserExportList = async (req, res) => {
    try {
        res.status(200).json({ result: '200', exportList: await userService.getUserExportList() });
    } catch (error) {
        console.error("[getUserExportList] Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
};

exports.getUserToPaymentExportList = async (req, res) => {
    try {
        res.status(200).json({ result: '200', exportList: await  userToPaymentService.getAllUserToPaymentList() });
    } catch (error) {
        console.error("[getUserToOwnerExportList] Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
};

exports.getUserToOwnerExportList = async (req, res) => {
    try {
        res.status(200).json({ result: '200', exportList: await  userToOwnerService.getUserToOwner() });
    } catch (error) {
        console.error("[getUserToOwnerExportList] Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
};

exports.getUserToPermissionExportList = async (req, res) => {
    try {
        res.status(200).json({ result: '200', exportList: await userToPermissionService.getUserToPermissionExportList() });
    } catch (error) {
        console.error("[getUserToPermissionExportList] Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
}


exports.getRoomExportList = async (req, res) => {
    try {
        res.status(200).json({ result: '200', exportList: await backupService.getRoomExportList() });
    } catch (error) {
        console.error("[getRoomExportList] Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
};

exports.getRoomtositeExportList = async (req, res) => {
    try {
        res.status(200).json({ result: '200', exportList: await roomtositeService.getAllRoomtositeList()})
    } catch (error) {
        console.error("[getRoomtositeExportList] Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
};

exports.getBookingExportList = async (req, res) => {
    try {
        res.status(200).json({ result: '200', exportList: await bookingService.getAllBookingList() });
    } catch (error) {
        console.error("[getBookingExportList] Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
};


exports.importAllDataBaseTable =  async (req, res) => {
    try {
        res.status(200).json({ result: '200', exportList: await backupService.importAllDB(req.body) });
    } catch (error) {
        console.error("[importAllDataBaseTable] Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
};


exports.patchImportRoomList = async (req, res) => {
    try {
        const roomList = req.body.importRoomList;
        if (!Array.isArray(roomList) || roomList.length === 0) {
            return res.status(400).json({ result: '400', error: "請提供有效的房間資料陣列" });
        }

        const logResults = await backupService.patchImportRoomList(roomList);
        res.status(200).json({ result: '200', data: logResults });
    } catch (error) {
        console.error("[patchImportBookingList] Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
};


