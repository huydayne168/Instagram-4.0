const { Server } = require("socket.io");
const allowOrigins = require("../../configs/allowOrigins");
const { createMessage } = require("../mongooseQuery/messageQuery");

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: allowOrigins, // frontend domain
            credentials: true,
        },
    });
    const onlineUsers = new Map();
    // io connection event
    io.on("connection", (socket) => {
        console.log("A user connected: " + socket.id);

        socket.on("addUser", (userId) => {
            onlineUsers.set(userId, socket.id);
            console.log("👤 User online:", onlineUsers.values());
        });

        socket.on("sendMessage", async ({ senderId, receiverId, contents }) => {
            console.log("Message received:", {
                senderId,
                receiverId,
                contents,
            });
            // Lưu tin nhắn vào DB
            const message = await createMessage({
                senderId,
                receiverId,
                contents,
            });
            const receiverSocket = onlineUsers.get(receiverId);
            console.log(receiverSocket);
            if (receiverSocket) {
                console.log(
                    "Receiver is online, sending message to socket:",
                    receiverSocket
                );
                io.to(receiverSocket).emit("receiveMessage", {
                    receiverId,
                    senderId,
                    contents,
                    createdAt: message.createdAt,
                });
            }
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("User disconnected: " + socket.id);
        });
    });
};

module.exports = setupSocket;
