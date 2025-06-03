export type Notification = {
    _id: string;
    type: "LIKE" | "COMMENT" | "FOLLOW";
    userId: string;
    content: string;
    createdAt: Date;
};
