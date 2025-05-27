import React from "react";
import CurrentAccount from "./CurrentAccount";
import Suggested from "./Suggested";
import Information from "./Information";

const RightSide = () => {
    return (
        <div className="mt-[42px] w-[320px] flex flex-col text-sm">
            <CurrentAccount />
            <Suggested />
            <Information />
        </div>
    );
};

export default RightSide;
