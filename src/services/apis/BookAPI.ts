import { AxiosError } from "axios";
import { axiosInstance } from "../../config/axiosInstance";
import { Book } from "../../interfaces/Book";

const errorHandler = (error: AxiosError) => {
    if (error.response?.status === 500) {
        throw new Error("Something went wrong with server");
    }
    throw new Error("System error ! Please try again");
};
export const getAllBooks = async () => {
    try {
        const response = await axiosInstance.get("/books");
        return response.data as Book[];
    } catch (error) {
        errorHandler(error as AxiosError);
    }
};
export const getBookById = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/books/${id}`);
        return response.data as Book;
    } catch (error) {
        errorHandler(error as AxiosError);
    }
};
export const addNewBook = async (book: Book) => {
    try {
        const response = await axiosInstance.post(
            "/books",
            JSON.stringify(book)
        );
        return response.data as Book;
    } catch (error) {
        errorHandler(error as AxiosError);
    }
};
export const updateBook = async (book: Book) => {
    try {
        const response = await axiosInstance.put(
            `/books/${book.book_id}`,
            JSON.stringify(book)
        );
        return response.data as Book;
    } catch (error) {
        errorHandler(error as AxiosError);
    }
};
