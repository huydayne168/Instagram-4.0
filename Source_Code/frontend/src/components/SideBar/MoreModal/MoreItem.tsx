import React, { MouseEventHandler } from "react";

const MoreItem: React.FC<{
    Icon?: React.FC;
    title: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
}> = ({ Icon, title, onClick }) => {
    return (
        <div
            className="rounded-lg hover:bg-lightSecondDark cursor-pointer"
            onClick={onClick}
        >
            <div>{Icon && <Icon />}</div>
            <div className="text-sm text-white p-4 leading-[18px]">{title}</div>
        </div>
    );
};

export default MoreItem;
