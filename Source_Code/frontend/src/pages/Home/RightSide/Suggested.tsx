import React, { useEffect, useState } from "react";
import { User } from "../../../models/User";
import {
    getAllUsers,
    getSuggestedUsers as getSuggestedUsersList,
} from "../../../services/userService";
import UserTagBar from "../../../components/UI/UserTagBar";
import usePrivateHttp from "../../../hooks/usePrivateHttp";

const SuggestedUsersAction = () => {
    return (
        <div className="text-blue text-xs cursor-pointer hover:opacity-50">
            Follow
        </div>
    );
};

const Suggested = () => {
    const privateHttp = usePrivateHttp();
    const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);

    const getSuggestedUsers = async () => {
        try {
            // Fetch suggested users
            const result = await getSuggestedUsersList(privateHttp);
            setSuggestedUsers(result?.data.users);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSuggestedUsers();
    }, []);
    console.log(suggestedUsers);

    return (
        <div className="mx-4 mt-6 mb-3">
            <div className="flex justify-between items-center">
                <div className="font-semibold text-textSecondGray">
                    Suggested for you
                </div>

                <div className="font-semibold text-white text-xs cursor-pointer hover:text-textGray select-none ">
                    See all
                </div>
            </div>

            <div className="flex flex-col py-2">
                {suggestedUsers && suggestedUsers.length > 0 ? (
                    suggestedUsers.map((user, index) => {
                        return (
                            <UserTagBar
                                key={`suggested-${user._id}`}
                                username={user.username}
                                avatar={user.avatar}
                                annotate="Suggested for you"
                                ActionButton={SuggestedUsersAction}
                                className="py-2"
                                annotateClassName="text-xs"
                            />
                        );
                    })
                ) : (
                    <div className="text-textSecondGray text-sm text-center italic">
                        No suggested users
                    </div>
                )}
            </div>
        </div>
    );
};

export default Suggested;
