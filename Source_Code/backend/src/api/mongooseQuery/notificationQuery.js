const Notification = require("../models/notification");

exports.createNotification = (senderId, receiverId, content, type) => {
    return Notification.create({
        senderId,
        receiverId,
        content,
        type,
    });
};

exports.getNotificationsByUserId = (userId) => {
    return Notification.find({ receiverId: userId })
        .populate("senderId", "username avatar")
        .sort({ createdAt: -1 });
};
