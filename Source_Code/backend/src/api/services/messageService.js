const userQuery = require("../mongooseQuery/userQuery");
const messageQuery = require("../mongooseQuery/messageQuery");

const getMessages = (sender_id, receiver_id) => {
    return new Promise((resolve, reject) => {
        const receiver = userQuery.findAnUser({ _id: receiver_id });
        const sender = userQuery.findAnUser({ _id: sender_id });

        if (!receiver || !sender) {
            return reject({
                status: 404,
                message: "Sender or receiver not found",
            });
        }
        const messages = messageQuery.getMessages(sender_id, receiver_id);
        if (!messages) {
            return reject({
                status: 404,
                message: "No messages found between these users",
            });
        }

        resolve(messages);
    });
};

module.exports = {
    getMessages,
};
