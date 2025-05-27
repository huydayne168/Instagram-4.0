import React from "react";
import { Profile } from "../../../models/Profile";
import LeftAvatar from "./LeftAvatar";
import RightContent from "./RightContent";

const TopInformation: React.FC<{ profile: Profile }> = ({ profile }) => {
    return (
        <div className="grid grid-cols-3">
            <LeftAvatar avatarUrl={profile.avatar} />
            <RightContent profile={profile} />
        </div>
    );
};

export default TopInformation;
