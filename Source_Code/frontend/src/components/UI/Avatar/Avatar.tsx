import React from "react";
import defaultAvatar from "../../../assets/default-avatar.png";

const Avatar: React.FC<{
    avatarUrl?: string | null;
    username?: string;
    className: string;
}> = ({ avatarUrl, username, className }) => {
    return (
        <div className={className + " rounded-full overflow-hidden"}>
            <img
                className="w-full h-full object-cover"
                src={avatarUrl ?? defaultAvatar} // If user don't have avatar (avatar equals null), we will use the default avatar
                alt={username + " avatar"}
            />
        </div>
    );
};

export default Avatar;
