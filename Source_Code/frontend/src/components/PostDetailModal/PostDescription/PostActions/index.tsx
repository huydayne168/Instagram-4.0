import React from "react";
import PostReact from "./PostReact";
import { Post } from "../../../../models/Post";
import PostComment from "./PostComment";

const PostActions: React.FC<{ postData: Post }> = ({ postData }) => {
    return (
        <div className="flex flex-col">
            <PostReact postData={postData} />
            <PostComment postId={postData._id} postData={postData} />
        </div>
    );
};

export default PostActions;
