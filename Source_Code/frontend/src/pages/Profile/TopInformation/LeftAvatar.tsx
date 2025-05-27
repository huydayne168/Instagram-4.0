import React from "react";
import Avatar from "../../../components/UI/Avatar/Avatar";

const LeftAvatar: React.FC<{ avatarUrl: string | null }> = ({ avatarUrl }) => {
    return (
        <div className="flex justify-center items-center">
            <Avatar avatarUrl={avatarUrl} className="w-[150px] h-[150px]" />
        </div>
    );
};

export default LeftAvatar;
