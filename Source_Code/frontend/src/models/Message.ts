export type Message = {
    _id: string;
    contents: string;
    receiver_id?: string;
    sender_id?: string;
    createdAt: Date;
};
