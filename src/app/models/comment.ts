import { Blog } from "./blog";
import { User } from "./user";

export interface Comment {
    id?: number;
    content?: string;
    blog?: Blog;
    blogId?: number;
    user?: User;
    creationDateTime?: string;
    updateDateTime?: string;
}
