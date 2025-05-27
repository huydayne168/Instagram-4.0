import http from "../lib/axios/http";
import { authActions } from "../lib/redux/authSlice";
import { useAppDispatch } from "./useStore";

const useRefreshToken = () => {
    const dispatch = useAppDispatch();

    const refresh = async () => {
        try {
            const response = await http.get("/auth/refresh-access-token", {
                withCredentials: true,
            });
            dispatch(
                authActions.storeNewAccessToken(response.data.refreshToken)
            );
            return response.data.newAccessToken;
        } catch (error) {
            console.log(error);
        }
    };

    return refresh;
};

export default useRefreshToken;
