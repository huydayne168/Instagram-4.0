const notificationQuery = require("../mongooseQuery/notificationQuery");
const { StatusCodes } = require("http-status-codes");
exports.getAllNotifications = (receiverId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const notifications =
                await notificationQuery.getNotificationsByUserId(receiverId);
            resolve({
                notifications: notifications,
                status: StatusCodes.OK,
            });
        } catch (error) {
            reject({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Error to get all notifications!",
            });
        }
    });
};
