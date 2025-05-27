export type PhotoVideo = {
    _id?: string;
    url: string;
    postId?: string;
    postIndex?: number;
    type: "VIDEO" | "PHOTO";
};
