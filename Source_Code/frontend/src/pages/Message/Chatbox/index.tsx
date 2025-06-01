import React, { useEffect, useState } from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import { useLocation, useParams } from "react-router-dom";
import ChatBoxInput from "./ChatBoxInput";
import ChatBoxList from "./ChatBoxList";
import usePrivateHttp from "../../../hooks/usePrivateHttp";
import { useAppSelector } from "../../../hooks/useStore";
import { socket } from "../../../socket/socket";
import { Message } from "../../../models/Message";
const ChatBox = () => {
    const sendingUser = useLocation().state?.user;
    const currentUser = useAppSelector((state) => state.authSlice.userInfo);
    const privateHttp = usePrivateHttp();
    const [messages, setMessages] = useState<Message[]>([]);
    // get user data and chats:
    const getChatHistory = async () => {
        try {
            const response = await privateHttp.get("/message", {
                params: {
                    sender_id: currentUser?._id,
                    receiver_id: sendingUser?._id,
                },
            });
            console.log("Chat history:", response.data);
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }
    };

    const sendMessage = async (message: string) => {
        if (!message.trim()) return;

        socket.emit("sendMessage", {
            senderId: currentUser?._id,
            receiverId: sendingUser?._id,
            contents: message,
        });
        const newMessage: Message = {
            _id: Date.now().toString(),
            contents: message,
            receiver_id: sendingUser?._id,
            sender_id: currentUser?._id,
            createdAt: new Date(),
        };
        setMessages((prev: Message[]) => [...prev, newMessage]);
    };

    useEffect(() => {
        getChatHistory();
    }, [sendingUser]);

    useEffect(() => {
        socket.on("receiveMessage", (message: Message) => {
            console.log("Received message:", message);
            setMessages((prev: Message[]) => [...prev, message]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);
    return (
        <div className="flex-1 h-full flex flex-col">
            <ChatBoxHeader user={sendingUser} />
            <ChatBoxList messages={messages} sendingUser={sendingUser} />
            <ChatBoxInput sendMessage={sendMessage} />
        </div>
    );
};

export default ChatBox;
