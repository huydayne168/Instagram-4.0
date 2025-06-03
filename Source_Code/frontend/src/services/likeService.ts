import axios, { AxiosInstance } from "axios";
import { z } from "zod";

// Like validation:
const likeDataSchema = z.object({
    postId: z.string().optional(),
    commentId: z.string().optional(),
});

export const validateLikeData = (data: LikeData) => {
    const result = likeDataSchema.safeParse(data);
    return result;
};

type LikeData = z.infer<typeof likeDataSchema>;

// like post:
export const likePost = async (privateHttp: AxiosInstance, data: LikeData) => {
    try {
        const res = await privateHttp.post("/like/create-like-post", data);

        return res;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data || error.message);
        } else {
            console.log("An unexpected error occurred", error);
        }
    }
};

// unlike post:
export const unlikePost = async (
    privateHttp: AxiosInstance,
    data: LikeData
) => {
    try {
        const res = await privateHttp.delete("/like/delete-like-post", {
            data,
        });
        return res;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data || error.message);
        } else {
            console.log("An unexpected error occurred", error);
        }
    }
};
