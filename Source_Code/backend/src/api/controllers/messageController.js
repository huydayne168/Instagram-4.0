const messageService = require("../services/messageService");

const getMessages = async (req, res) => {
    try {
        const { sender_id, receiver_id } = req.query;
        // Assuming you have a service to fetch messages
        const messages = await messageService.getMessages(
            sender_id,
            receiver_id
        );
        res.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getMessages,
};
