import { AxiosError } from "axios";
import { axiosInstance } from "../../config/axiosInstance";
import { Book } from "../../interfaces/Book";
import bearerTokenConfig from "../../config/adminToken";

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
export const getBooksByCategory = async (categoryId: string | number) => {
    try {
        const response = await axiosInstance.get(
            `/categories/${categoryId}/books`
        );
        return response.data as Book[];
    } catch (error) {
        errorHandler(error as AxiosError);
    }
};
export const addNewBook = async (book: Book) => {
    const config = bearerTokenConfig();
    try {
        const response = await axiosInstance.post(
            "/books",
            JSON.stringify(book),
            config
        );
        return response.data as Book;
    } catch (error) {
        errorHandler(error as AxiosError);
    }
};
export const updateBook = async (book: Book) => {
    const config = bearerTokenConfig();
    try {
        const response = await axiosInstance.put(
            `/books/${book.book_id}`,
            JSON.stringify(book),
            config
        );
        return response.data as Book;
    } catch (error) {
        errorHandler(error as AxiosError);
    }
};
export const deleteBook = async (id: string) => {
    const config = bearerTokenConfig();
    try {
        const response = await axiosInstance.delete(`/books/${id}`, config);
        return response.data as Book;
    } catch (error) {
        errorHandler(error as AxiosError);
    }
};
