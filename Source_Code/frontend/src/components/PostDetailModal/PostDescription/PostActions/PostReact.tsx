import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    likePost,
    unlikePost,
    validateLikeData,
} from "../../../../services/likeService";
import LikedIcon from "../../../UI/Icons/LikedIcon";
import LikeIcon from "../../../UI/Icons/LikeIcon";
import CommentIcon from "../../../UI/Icons/CommentIcon";
import SharePostIcon from "../../../UI/Icons/SharePostIcon";
import SaveIcon from "../../../UI/Icons/SaveIcon";
import { Post } from "../../../../models/Post";
import usePrivateHttp from "../../../../hooks/usePrivateHttp";
import split1000 from "../../../../utils/split1000";
import { useAppSelector } from "../../../../hooks/useStore";
import calculateTimeAgo from "../../../../utils/calculateTimeAgo";

const PostReact: React.FC<{ postData: Post }> = ({ postData }) => {
    const [liked, setLiked] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState<number>(postData.likes.length);
    const privateHttp = usePrivateHttp();
    const currentUser = useAppSelector((state) => state.authSlice.userInfo);
    const timeAgo = calculateTimeAgo(postData.createdAt, true);
    // Check if the post is liked by the current user before?
    useEffect(() => {
        if (currentUser && currentUser._id && postData.likes) {
            const isLiked = postData.likes.find(
                (like) => like.userId === currentUser?._id
            );
            if (isLiked) {
                setLiked(true);
            }
        }
    }, []);

    const likeHandler = async () => {
        try {
            const validateResult = validateLikeData({ postId: postData._id });
            if (!validateResult.success) {
                console.log(validateResult.error, "error");
            } else {
                setLiked(true);
                setLikesCount((prev) => prev + 1);
                const result = await likePost(privateHttp, {
                    postId: postData._id,
                });
                console.log(result?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const unlikeHandler = async () => {
        try {
            const validateResult = validateLikeData({ postId: postData._id });
            if (!validateResult.success) {
                console.log(validateResult.error, "error");
            } else {
                setLiked(false);
                setLikesCount((prev) => prev - 1);
                const result = await unlikePost(privateHttp, {
                    postId: postData._id,
                });
                console.log(result?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="border-l border-lightDark border-b">
            <div className="flex items-center pt-[10px] pb-2 px-4">
                <motion.div
                    className="flex items-center mr-3 hover:opacity-70 cursor-pointer"
                    onClick={() => {
                        liked ? unlikeHandler() : likeHandler();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {liked ? <LikedIcon /> : <LikeIcon />}
                </motion.div>
                <div className="flex items-center mr-3 hover:opacity-70 cursor-pointer">
                    <CommentIcon />
                </div>
                <div className="flex items-center mr-3 hover:opacity-70 cursor-pointer">
                    <SharePostIcon />
                </div>
                <div className="flex items-center ml-auto hover:opacity-70 cursor-pointer">
                    <SaveIcon />
                </div>
            </div>
            {/* Like Counts */}
            {postData.likes && (
                <div className="font-semibold text-sm px-4 mb-1 cursor-pointer">
                    {split1000(likesCount)}{" "}
                    {postData.likes.length > 1 ? "likes" : "like"}
                </div>
            )}
            <div className="px-4 mb-4 text-textGray text-xs">{timeAgo} ago</div>
        </div>
    );
};

export default PostReact;
