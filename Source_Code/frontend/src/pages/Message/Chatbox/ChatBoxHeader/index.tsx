import React from "react";
import { User } from "../../../../models/User";
import Avatar from "../../../../components/UI/Avatar/Avatar";

const ChatBoxHeader: React.FC<{ user: User }> = ({ user }) => {
    console.log;
    return (
        <div className="p-4 border-b border-lightSecondDark text-white">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10" avatarUrl={user.avatar} />

                    <div>
                        <h3 className="font-semibold text-sm">
                            {user.username || user.fullName}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBoxHeader;
