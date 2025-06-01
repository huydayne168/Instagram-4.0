import React from "react";
import Avatar from "../../../../components/UI/Avatar/Avatar";
import { Message } from "../../../../models/Message";

const MessageBubble: React.FC<{
    isOwn: boolean;
    message: Message;
    showAvatar: boolean;
    userAvatar: string | null;
}> = ({ isOwn, message, showAvatar, userAvatar }) => {
    return (
        <div
            className={`flex gap-2 mb-4 ${
                isOwn ? "justify-end" : "justify-start"
            }`}
        >
            {!isOwn && showAvatar && (
                <Avatar className="w-6 h-6 mt-auto" avatarUrl={userAvatar} />
            )}
            <div className={`max-w-xs ${isOwn ? "order-1" : ""}`}>
                <div
                    className={`px-4 py-2 rounded-2xl ${
                        isOwn
                            ? "bg-blue text-white ml-auto"
                            : "bg-lightSecondDark dark:bg-gray-800 text-black dark:text-white"
                    }`}
                >
                    <p className="text-sm">{message.contents}</p>
                </div>
                <div
                    className={`text-xs text-gray-500 mt-1 ${
                        isOwn ? "text-right" : "text-left"
                    }`}
                >
                    {message.createdAt
                        ? new Date(message.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                          })
                        : ""}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
