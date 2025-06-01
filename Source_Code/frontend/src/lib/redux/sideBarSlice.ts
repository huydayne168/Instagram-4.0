import { createSlice } from "@reduxjs/toolkit";

type SideBarState = {
    currentPage:
        | "home"
        | "explore"
        | "reels"
        | "message"
        | "create"
        | "profile";
    openedModal: "search" | "notifications" | null;
    isSmall?: boolean;
    creatingPost: boolean;
    moreModal: boolean;
};

const initialState: SideBarState = {
    currentPage: "home",
    openedModal: null,
    creatingPost: false,
    moreModal: false,
};

const sideBarSlice = createSlice({
    name: "sideBarSlice",
    initialState: initialState,
    reducers: {
        selectCurrentPage: (state, action) => {
            if (action.payload === "message") {
                state.isSmall = true;
            } else state.isSmall = false;
            state.currentPage = action.payload;
            state.openedModal = null;
        },

        openModal: (state, action) => {
            switch (action.payload) {
                case "search":
                    if (state.openedModal === "search")
                        state.openedModal = null;
                    else state.openedModal = "search";
                    break;
                case "notifications":
                    if (state.openedModal === "notifications")
                        state.openedModal = null;
                    else state.openedModal = "notifications";
                    break;
                default:
                    break;
            }
        },

        openCreatePost: (state, action) => {
            state.creatingPost = action.payload;
        },

        openMoreModal: (state, action) => {
            state.moreModal = action.payload;
        },
    },
});

export const sideBarActions = sideBarSlice.actions;
export default sideBarSlice;
