import React from "react";
import Avatar from "../../UI/Avatar/Avatar";

const NotificationsTag: React.FC<{ content: string }> = ({ content }) => {
    return (
        <div className="w-full py-2 px-6 flex gap-2 items-center hover:bg-lightDark cursor-pointer">
            <Avatar className={"h-44px w-44px flex-shrink-0"} />
            <p className="text-white">{content}</p>
        </div>
    );
};

export default NotificationsTag;
