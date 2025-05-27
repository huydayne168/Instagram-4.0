import React from "react";
import Avatar from "../../UI/Avatar/Avatar";

const NotificationsTag = () => {
    return (
        <div className="w-full py-2 px-6 flex justify-between items-center gap-6 hover:bg-lightDark cursor-pointer">
            <Avatar className={"h-44px w-44px flex-shrink-0"} />
            <p className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
        </div>
    );
};

export default NotificationsTag;
