import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Profile as ProfileType } from "../../models/Profile";
import { getUserProfile } from "../../services/userService";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import TopInformation from "./TopInformation";

const Profile = () => {
    const location = useLocation();
    const username = location.state.username;
    const privateHttp = usePrivateHttp();
    const [profile, setProfile] = useState<ProfileType | null>(null);

    // Get user profile:
    const getProfile = async () => {
        try {
            const result = await getUserProfile(privateHttp, username);
            setProfile(result?.data.profile);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(profile);
    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="max-w-[935px] w-[calc(100%-40px)] mx-auto pt-[30px] mb-[30px] px-5">
            {profile && <TopInformation profile={profile} />}
        </div>
    );
};

export default Profile;
