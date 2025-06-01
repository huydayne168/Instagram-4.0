import React from "react";
import { Post } from "../../../models/Post";
import CarouselIcon from "../../../components/UI/Icons/CarouselIcon";
import LikeIcon from "../../../components/UI/Icons/LikeIcon";
import CommentIcon from "../../../components/UI/Icons/CommentIcon";
import { useAppDispatch } from "../../../hooks/useStore";
import { postDetailModalActions } from "../../../lib/redux/postDetailModalSlice";

const ProfilePost: React.FC<{ post: Post }> = ({ post }) => {
    const dispatch = useAppDispatch();
    const handleOpenPostDetail = (postData: Post) => {
        dispatch(
            postDetailModalActions.openPostDetailModal({
                post: postData,
                prevPath: location.pathname,
            })
        );
    };
    return (
        <div
            key={post._id}
            className="relative aspect-[3/4] group cursor-pointer overflow-hidden"
            onClick={() => handleOpenPostDetail(post)}
        >
            <img
                src={post.photoVideo[0].url}
                alt="Post"
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />

            {/* Carousel indicator */}
            {post.photoVideo.length > 1 && (
                <div className="absolute top-2 right-2 z-10 text-white">
                    <CarouselIcon />
                </div>
            )}

            {/* Video indicator */}
            {/* {post. && (
                <div className="absolute top-2 right-2 z-10">
                    <div className="w-5 h-5 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-0.5"></div>
                    </div>
                </div>
            )} */}

            {/* Hover overlay with stats */}
            <div className="absolute inset-0 bg-dark bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-20">
                <div className="flex items-center gap-6 text-white">
                    {post.likes !== undefined && (
                        <div className="flex items-center gap-2">
                            <LikeIcon />
                            <span className="font-bold text-lg">
                                {post.likes.length}
                            </span>
                        </div>
                    )}
                    {post.comments !== undefined && (
                        <div className="flex items-center gap-2">
                            <CommentIcon />
                            <span className="font-bold text-lg">
                                {post.comments.length}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePost;
