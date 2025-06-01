const Message = require("../models/message");

const createMessage = (query) => {
    console.log("Creating message with query:", query);
    return Message.create({
        sender_id: query.senderId,
        receiver_id: query.receiverId,
        contents: query.contents,
    });
};

const getMessages = (senderId, receiverId) => {
    return Message.find({
        $or: [
            { sender_id: senderId, receiver_id: receiverId },
            { sender_id: receiverId, receiver_id: senderId },
        ],
    }).sort({ createdAt: 1 });
};

module.exports = {
    createMessage,
    getMessages,
};
