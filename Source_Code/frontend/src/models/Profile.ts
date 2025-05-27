import { Post } from "./Post";
import { User } from "./User";

export type Profile = User & {
    posts: Post[];
    saves?: Post[];
    tagged?: Post[];
};
