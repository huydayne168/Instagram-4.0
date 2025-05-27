import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";

type AuthSlice = {
    userInfo: User | undefined;
    accessToken: string;
};

const initialState: AuthSlice = {
    userInfo: undefined,
    accessToken: "",
};

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        loggedIn: (state, action) => {
            return (state = {
                userInfo: action.payload.userInfo,
                accessToken: action.payload.accessToken,
            });
        },
        storeNewAccessToken: (state, action) => {
            const newState = { ...state, accessToken: action.payload };
            return (state = newState);
        },

        loggedOut: (state, action) => {
            return (state = initialState);
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;
