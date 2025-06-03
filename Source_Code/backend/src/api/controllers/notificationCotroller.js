const notificationService = require("../services/notificationService");

exports.getNotificationsByUserId = async (req, res) => {
    const userId = req.currentUser.id;
    try {
        const result = await notificationService.getAllNotifications(userId);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error retrieving notifications",
            error: error.message,
        });
    }
};
