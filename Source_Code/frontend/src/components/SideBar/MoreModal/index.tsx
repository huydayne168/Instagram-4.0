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
        const _id = authSlice.userInfo?._id;
        if (_id) {
            try {
                const validationResult = validateLogoutData({
                    _id,
                });
                if (!validationResult.success) {
                    console.log(validationResult.error);
                } else {
                    const res = await logout(privateHttp, {
                        _id,
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
