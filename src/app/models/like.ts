import { Blog } from "./blog";
import { User } from "./user";

export interface Like {
    id?: number;
    user?: User;
    blog?: Blog;
}
