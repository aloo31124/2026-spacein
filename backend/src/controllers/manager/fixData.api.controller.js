const fixDataService = require('./../../services/fixData.service')

exports.fixUserIdField = async (req, res) => {
    try {
        const fixResult = await fixDataService.fixUserIdField();
        res.status(200).json({ result: '200', fixResult });
    } catch (error) {
        console.error("[fixUserIdField] Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
};


exports.fixBookingErrorFieldendDate = async (req, res) => {
    try {
        const fixResult = await fixDataService.fixBookingErrorFieldendDate();
        res.status(200).json({ result: '200', fixResult });
    } catch (error) {
        console.error("[fixBookingErrorField] Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
};


exports.fixBookingErrorFieldUserId = async (req, res) => {
    try {
        console.log(" [fixBookingErrorFieldUserId] 開始 ");
        const fixResult = await fixDataService.fixBookingErrorFieldUserId();
        console.log(" [fixBookingErrorFieldUserId] 結束! ");
        res.status(200).json({ result: '200', fixResult });
    } catch (error) {
        console.error("[fixBookingErrorFieldUserId] Error:", error);
        res.status(500).json({ result: '500', error: error.message });
    }
};


