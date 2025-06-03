import React from "react";
import { User } from "../../../models/User";
import UserTagBar from "../../UI/UserTagBar";

const SearchedResult: React.FC<{ results: User[] }> = ({ results }) => {
    return (
        <div className="flex flex-col gap-2 px-4">
            {results.map((user) => (
                <UserTagBar
                    _id={user._id}
                    username={user.username || user.fullName}
                    avatar={user.avatar}
                />
            ))}
        </div>
    );
};

export default SearchedResult;
