import axios, { AxiosInstance } from "axios";
import { z } from "zod";
import http from "../lib/axios/http";

// Comment Validation
const postCommentSchema = z.object({
    postId: z.string().min(1),
    content: z.string().min(1),
});

type PostCommentData = z.infer<typeof postCommentSchema>;

export const validatePostCommentData = (data: PostCommentData) => {
    const result = postCommentSchema.safeParse(data);
    return result;
};

// post Comment:
export const postComment = async (
    privateHttp: AxiosInstance,
    data: PostCommentData
) => {
    try {
        const res = await privateHttp.post("/comment/create-comment", data);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data || error.message);
        } else {
            console.log("An unexpected error occurred", error);
        }
    }
};

// get Comments:
export const getComments = async (postId: string) => {
    try {
        const res = await http.get(`/comment/get-comments`, {
            params: { postId },
        });

        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data || error.message);
        } else {
            console.log("An unexpected error occurred", error);
        }
    }
};
