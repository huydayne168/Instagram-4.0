import React from "react";
import { Profile } from "../../../models/Profile";

import Avatar from "../../../components/UI/Avatar/Avatar";
import Button from "../../../components/UI/Button/Button";
import { useAppSelector } from "../../../hooks/useStore";

const TopInformation: React.FC<{ profile: Profile }> = ({ profile }) => {
    const currentUserId = useAppSelector(
        (state) => state.authSlice.userInfo?._id
    );
    const [isOwnProfile, setIsOwnProfile] = React.useState<boolean>(
        profile._id === currentUserId
    );
    const [isFollowing, setIsFollowing] = React.useState<boolean>(
        (currentUserId && profile.followers?.includes(currentUserId)) || false
    );
    return (
        <div className="grid grid-cols-3 text-white px-4 py-6">
            {/* <LeftAvatar avatarUrl={profile.avatar} />
            <RightContent profile={profile} /> */}

            {/* Profile Picture */}
            <div className="relative">
                <Avatar
                    avatarUrl={profile.avatar}
                    className="w-[150px] h-[150px]"
                />
            </div>

            {/* Profile Stats and Info */}
            <div className="flex-1 col-span-2">
                <div className="flex gap-2 mb-6">
                    {isOwnProfile ? (
                        <>
                            <Button
                                content="Edit profile"
                                className="px-4 py-1.5 text-sm bg-textGray hover:bg-gray-600 rounded"
                            />

                            <Button
                                content="View activity"
                                className="px-4 py-1.5 text-sm bg-textGray hover:bg-gray-600 rounded "
                            />

                            <Button
                                content="..."
                                className="w-8 h-8 bg-textGray hover:bg-gray-600 rounded"
                            />
                        </>
                    ) : (
                        <>
                            <Button
                                content={isFollowing ? "Following" : "Follow"}
                                className="flex items-center gap-1 px-4 py-1.5 text-sm bg-textGray hover:bg-gray-600 rounded"
                            />

                            {isFollowing && (
                                <Button
                                    content="Unfollow"
                                    className="px-4 py-1.5 text-sm bg-red-500 hover:bg-red-600 rounded"
                                />
                            )}
                            <Button
                                content="Message"
                                className="px-4 py-1.5 text-sm bg-textGray hover:bg-gray-600 rounded"
                            />
                        </>
                    )}
                </div>
                {/* Stats */}
                <div className="flex gap-8 mb-4">
                    <div className="text-center">
                        <div className="text-xl font-semibold">
                            {profile.posts.length}
                        </div>
                        <div className="text-sm">posts</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-semibold">
                            {profile.followers?.length}
                        </div>
                        <div className="text-sm">followers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-semibold">
                            {profile.followings?.length}
                        </div>
                        <div className="text-sm">following</div>
                    </div>
                </div>

                {/* Bio */}
                <div className="space-y-1">
                    <h2 className="font-semibold">{profile.fullName}</h2>
                    {profile.bio && <p className="text-sm">{profile.bio}</p>}
                    {profile.email && (
                        <p className="text-sm">{profile.email}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopInformation;
