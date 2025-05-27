import React from "react";
import { Profile } from "../../../models/Profile";
import { Link } from "react-router-dom";

const RightContent: React.FC<{ profile: Profile }> = ({ profile }) => {
    return (
        <div>
            <div className="flex">
                <div className="text-white whitespace-nowrap text-xl leading-[25px]">
                    {profile.username}
                </div>
                <div className="flex text-white">
                    <div className="bg-lightSecondDark rounded-md">
                        <Link
                            to={"/account/edit"}
                            className="inline-block h-8 px-4 pt-[3px]"
                        >
                            Edit profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightContent;
