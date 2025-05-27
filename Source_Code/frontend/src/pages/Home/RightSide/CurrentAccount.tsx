import React from "react";
import Avatar from "../../../components/UI/Avatar/Avatar";
import { useAppSelector } from "../../../hooks/useStore";
import useRedirect from "../../../hooks/useRedirect";
import UserTagBar from "../../../components/UI/UserTagBar";

const CurrentAccountAction = () => {
    return (
        <div className="flex items-center">
            <div className="text-blue text-xs cursor-pointer hover:opacity-50">
                Switch
            </div>
        </div>
    );
};

const CurrentAccount = () => {
    const currentUser = useAppSelector((state) => state.authSlice);
    const { gotoProfilePage } = useRedirect();
    return (
        <div className="">
            <UserTagBar
                username={currentUser.userInfo?.username}
                avatar={currentUser.userInfo?.avatar}
                annotate={currentUser.userInfo?.fullName}
                ActionButton={CurrentAccountAction}
                className="px-4"
                annotateClassName="text-sm"
            />
        </div>
    );
};

export default CurrentAccount;
