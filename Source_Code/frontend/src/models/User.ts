export type User = {
    _id: string;
    username?: string;
    password?: string;
    email: string;
    bio: string | null;
    fullName: string;
    avatar: string | null;
    followers?: User[];
    followings?: string[];
    refreshToken?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
