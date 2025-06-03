import React, { useEffect, useState } from "react";
import VideoPhotoSwiper from "../../../../components/UI/VideoPhotoSwiper";
import LikeIcon from "../../../../components/UI/Icons/LikeIcon";
import CommentIcon from "../../../../components/UI/Icons/CommentIcon";
import SharePostIcon from "../../../../components/UI/Icons/SharePostIcon";
import SaveIcon from "../../../../components/UI/Icons/SaveIcon";
import split1000 from "../../../../utils/split1000";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useStore";
import LikedIcon from "../../../../components/UI/Icons/LikedIcon";
import { motion } from "framer-motion";
import {
    likePost,
    unlikePost,
    validateLikeData,
} from "../../../../services/likeService";
import usePrivateHttp from "../../../../hooks/usePrivateHttp";
import useRedirect from "../../../../hooks/useRedirect";
import { postDetailModalActions } from "../../../../lib/redux/postDetailModalSlice";
import { Post } from "../../../../models/Post";
import { useLocation } from "react-router-dom";
import { socket } from "../../../../socket/socket";

const PostContent: React.FC<{
    postData: Post;
}> = ({ postData }) => {
    const [liked, setLiked] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState<number>(postData.likes.length);
    const currentUser = useAppSelector((state) => state.authSlice.userInfo);
    const privateHttp = usePrivateHttp();
    const gotoProfilePage = useRedirect().gotoProfilePage;
    const dispatch = useAppDispatch();
    const location = useLocation();

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
    }, [currentUser, postData.likes]);

    const openPostDetailModal = () => {
        dispatch(
            postDetailModalActions.openPostDetailModal({
                post: postData,
                prevPath: location.pathname,
            })
        );
    };

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
                socket.emit("sendNotification", {
                    senderId: currentUser?._id,
                    receiverId: postData.userId,
                    type: "LIKE",
                    content: `${currentUser?.username} liked your post`,
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
        <div className="w-full">
            {/* Post Photo & Video */}
            <div className="border-[0.5px] border-lightDark rounded overflow-hidden max-h-[585px]">
                <VideoPhotoSwiper videoPhotoList={postData.photoVideo} />
            </div>

            {/* Post Actions */}
            <div className="flex items-center mt-[10px] pb-2 h-10">
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
                <div
                    onClick={openPostDetailModal}
                    className="flex items-center mr-3 hover:opacity-70 cursor-pointer"
                >
                    <CommentIcon />
                </div>
                <div className="flex items-center mr-3 hover:opacity-70 cursor-pointer">
                    <SharePostIcon />
                </div>
                <div className="flex items-center ml-auto hover:opacity-70 cursor-pointer">
                    <SaveIcon />
                </div>
            </div>

            {/* Post Like Count */}
            <div className="font-semibold text-sm ">
                {split1000(likesCount)} {likesCount > 1 ? "likes" : "like"}
            </div>

            {/* Post Caption */}
            <div className="text-sm">
                <span
                    className="font-semibold inline-block mr-1 cursor-pointer"
                    onClick={() => {
                        gotoProfilePage(postData.userId.username);
                    }}
                >
                    {postData.userId.username}
                </span>
                <span>{postData.caption}</span>
            </div>

            {/* View Comments */}
            <div onClick={openPostDetailModal}>
                <span className="text-sm text-textSecondGray cursor-pointer mt-[2px]">
                    View all comments
                </span>
            </div>
        </div>
    );
};

export default PostContent;
