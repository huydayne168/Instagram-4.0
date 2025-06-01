import { AxiosInstance } from "axios";
import http from "../lib/axios/http";

// Get All User Service:
export const getAllUsers = async () => {
    try {
        const res = await http.get("/user/get-all-users");
        return res;
    } catch (error) {
        console.log(error);
    }
};

// Get All User Service:
export const getSuggestedUsers = async (privateHttp: AxiosInstance) => {
    try {
        const res = await privateHttp.get("/user/get-suggested-users");
        return res;
    } catch (error) {
        console.log(error);
    }
};

// Get User Profile Service:
export const getUserProfile = async (
    privateHttp: AxiosInstance,
    _id: string
) => {
    try {
        const res = await privateHttp.get(`/user/get-profile`, {
            params: { _id },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

// Create Follow Service:
export const createFollow = async (
    privateHttp: AxiosInstance,
    userId: string
) => {
    try {
        const res = await privateHttp.post("/user/create-follow", {
            userId,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

// Delete Follow Service:
export const deleteFollow = async (
    privateHttp: AxiosInstance,
    userId: string
) => {
    try {
        const res = await privateHttp.post("/user/delete-follow", {
            userId,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
