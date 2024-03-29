export interface Book {
    book_id: number;
    title: string;
    description: string;
    isbn: string;
    publicationDate: string;
    price: number;
    stockQuantity: number;
    avatar_url?: string;
    authorIds: number[];
}
