export type User = {
    _id: string;
    username: string;
    password?: string;
    email: string;
    bio: string | null;
    fullName: string;
    avatar: string | null;
    followers?: User[];
    refreshToken?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
