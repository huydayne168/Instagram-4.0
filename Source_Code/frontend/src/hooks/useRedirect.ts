import { useNavigate } from "react-router-dom";
import { User } from "../models/User";

const useRedirect = () => {
    const navigate = useNavigate();

    const gotoLoginPage = () => {
        navigate("/login");
    };

    const gotoSignUpPage = () => {
        navigate("/sign-up");
    };

    const gotoHomePage = () => {
        navigate("/");
    };

    const gotoProfilePage = (_id?: string) => {
        navigate(`/profile/${_id}`, { state: { _id } });
    };

    const gotoMessagePage = (_id?: string, user?: User) => {
        if (_id) {
            navigate(`/message/${_id}`, { state: { user } });
        } else navigate("/message");
    };

    return {
        gotoLoginPage,
        gotoSignUpPage,
        gotoHomePage,
        gotoProfilePage,
        gotoMessagePage,
    };
};

export default useRedirect;
