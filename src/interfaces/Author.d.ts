import { Book } from "./Book";

export interface Author {
    author_id: number;
    name: string;
    biography: string;
    avatar_url?: string;
    books?:Book[]
}
