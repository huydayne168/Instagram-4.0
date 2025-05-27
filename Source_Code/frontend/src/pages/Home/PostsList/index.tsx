import { useEffect } from "react";

import { getAllPosts } from "../../../services/postService";
import http from "../../../lib/axios/http";
import Post from "./Post";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { postsListActions } from "../../../lib/redux/postsListSlice";

function PostsList() {
    const dispatch = useAppDispatch();
    const postsList = useAppSelector((state) => state.postsListSlice);

    // Get Post Handler:
    const getPostsHandler = async () => {
        try {
            const res = await getAllPosts(http);
            console.log(res?.data.postsList);
            dispatch(postsListActions.addPosts(res?.data.postsList));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPostsHandler();
    }, []);

    return (
        <div className="text-white flex flex-col items-center max-w-[630px] mt-6">
            {/* Render Posts */}
            {postsList &&
                postsList.map((post, index) => {
                    return <Post key={post._id} postData={post} />;
                })}
        </div>
    );
}

export default PostsList;
