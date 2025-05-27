import React, { useEffect, useRef } from "react";
import MoreItem from "./MoreItem";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { logout, validateLogoutData } from "../../../services/logoutService";
import usePrivateHttp from "../../../hooks/usePrivateHttp";
import { authActions } from "../../../lib/redux/authSlice";
import useRedirect from "../../../hooks/useRedirect";

const MoreModal = () => {
    const dispatch = useAppDispatch();
    const authSlice = useAppSelector((state) => state.authSlice);
    const privateHttp = usePrivateHttp();
    const { gotoLoginPage } = useRedirect();

    // Logout handler:
    const logoutHandler = async () => {
        const username = authSlice.userInfo?.username;
        if (username) {
            try {
                const validationResult = validateLogoutData({
                    username,
                });
                if (!validationResult.success) {
                    console.log(validationResult.error);
                } else {
                    const res = await logout(privateHttp, {
                        username,
                    });
                    console.log(res);
                    dispatch(authActions.loggedOut(null));
                    gotoLoginPage();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="w-[250px] bg-lightDark p-2 rounded-md flex flex-col absolute -top-[calc(100%+18px)]">
            <MoreItem title="Log out" onClick={logoutHandler} />
        </div>
    );
};

export default MoreModal;
