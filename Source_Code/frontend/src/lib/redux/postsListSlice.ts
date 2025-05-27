import { Post } from "../../models/Post";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Post[] = [];

const postsListSlice = createSlice({
    name: "postsListSlice",
    initialState: initialState,
    reducers: {
        addPosts: (state, action) => {
            return (state = action.payload);
        },
        addPost: (state, action) => {
            state.unshift(action.payload);
        },
        updatePost: (state, action) => {
            const index = state.findIndex(
                (post) => post._id === action.payload._id
            );
            state[index] = action.payload;
        },
        deletePost: (state, action) => {
            return state.filter((post) => post._id !== action.payload);
        },
    },
});

export const postsListActions = postsListSlice.actions;
export default postsListSlice;
