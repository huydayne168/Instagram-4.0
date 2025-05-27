import React, { useEffect } from "react";
import { Post } from "../../models/Post";
import VideoPhotoSwiper from "../UI/VideoPhotoSwiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { postDetailModalActions } from "../../lib/redux/postDetailModalSlice";
import PostDescription from "./PostDescription";

const PostDetailModal: React.FC<{ postData?: Post }> = ({ postData }) => {
    const dispatch = useAppDispatch();
    const [postDataState, setPostDataState] = React.useState<Post | null>(null);
    const postDetailSlice = useAppSelector(
        (state) => state.postDetailModalSlice
    );

    useEffect(() => {
        if (postData) {
            setPostDataState(postData);
        } else {
            setPostDataState(postDetailSlice.post);
        }
    }, [postData]);

    const closePostDetailModal = () => {
        dispatch(postDetailModalActions.closePostDetailModal());
    };

    return (
        <div
            className={`absolute w-screen h-screen inset-0 flex justify-center items-center`}
        >
            {/* This is the backdrop*/}
            <div
                className="absolute inset-0 h-screen w-screen bg-dark opacity-70 z-10"
                onClick={closePostDetailModal}
            ></div>

            {/* This is the x close btn */}
            <div
                className="absolute top-2 right-8 text-textGray cursor-pointer z-20"
                onClick={closePostDetailModal}
            >
                <FontAwesomeIcon icon={faXmark} className="text-3xl" />
            </div>

            {/* Modal */}
            <div className="h-3/4 min-h-[calc(100%-40px)] m-auto flex relative z-20 bg-dark  border border-lightDark">
                {/* Post Photo Video Swiper */}
                <div className="max-h-full w-[647px] min-w-[500px] basis-[647px]">
                    {postDataState && (
                        <VideoPhotoSwiper
                            videoPhotoList={postDataState.photoVideo}
                        />
                    )}
                </div>
                {/* Post Description */}
                {postDataState && <PostDescription postData={postDataState} />}
            </div>
        </div>
    );
};

export default PostDetailModal;
