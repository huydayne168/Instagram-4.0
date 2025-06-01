import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Profile as ProfileType } from "../../models/Profile";
import { getUserProfile } from "../../services/userService";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import TopInformation from "./TopInformation";
import PostList from "./PostList";

const Profile = () => {
    const location = useLocation();
    const _id = location.state._id;
    const privateHttp = usePrivateHttp();
    const [profile, setProfile] = useState<ProfileType | null>(null);

    // Get user profile:
    useEffect(() => {
        const getProfile = async () => {
            try {
                const result = await getUserProfile(privateHttp, _id);
                setProfile(result?.data.profile);
            } catch (error) {
                console.log(error);
            }
        };

        getProfile();
    }, [location]);

    return (
        <div className="max-w-[935px] w-[calc(100%-40px)] mx-auto py-[30px] px-5 overflow-y-auto scrollbar-hide">
            {profile && <TopInformation profile={profile} />}
            {profile && (
                <PostList
                    posts={profile.posts || []}
                    saved={profile.saved || []}
                />
            )}
        </div>
    );
};

export default Profile;
