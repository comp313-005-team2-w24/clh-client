import { Book } from "./Book";

export interface Category {
    id: number;
    name: string;
    description: string;
    books?: Partial<Book>[];
}
