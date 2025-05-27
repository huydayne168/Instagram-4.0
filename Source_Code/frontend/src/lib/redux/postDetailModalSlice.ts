import { createSlice } from "@reduxjs/toolkit";
import { Post } from "../../models/Post";

type PostDetailModalSlice = {
    isOpen: boolean;
    post: Post | null;
    prePath: string | null;
};

const initialState: PostDetailModalSlice = {
    isOpen: false,
    post: null,
    prePath: null,
};

const postDetailModalSlice = createSlice({
    name: "postDetailModal",
    initialState: initialState,
    reducers: {
        openPostDetailModal: (state, action) => {
            return (state = {
                isOpen: true,
                post: action.payload.post,
                prePath: action.payload.prePath,
            });
        },
        closePostDetailModal: (state) => {
            return (state = initialState);
        },
    },
});

export const postDetailModalActions = postDetailModalSlice.actions;
export default postDetailModalSlice;
