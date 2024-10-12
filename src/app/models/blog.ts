import { Category } from "./category";
import { Like } from "./like";
import { User } from "./user";

export interface Blog {
    id?: number;
    title?: string;
    content?: string;
    user?: User;
    imageUrl?: string;
    category?: Category;
    comments?: Comment[];
    likes?: Like[];
    creationDateTime?: string;
    updateDateTime?: string;
}
