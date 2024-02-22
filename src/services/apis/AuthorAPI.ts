import { AxiosError } from "axios";
import { axiosInstance } from "../../config/axiosInstance";
import { Author } from "../../interfaces/Author";

const errorHandler = (error: AxiosError) => {
    if (error.response?.status === 500) {
        throw new Error("Something went wrong with server");
    }
    throw new Error("System error ! Please try again");
};

export const getAllAuthors = async (): Promise<Author[]> => {
    try {
        const response = await axiosInstance.get("/authors");
        return response.data;
    } catch (error) {
        return errorHandler(error as AxiosError);
    }
};
export const addNewAuthor = async (author: Author): Promise<Author> => {
    try {
        const response = await axiosInstance.post(
            "/authors",
            JSON.stringify(author)
        );
        return response.data;
    } catch (error) {
        return errorHandler(error as AxiosError);
    }
};
export const getAuthorById = async (id: string): Promise<Author> => {
    try {
        const response = await axiosInstance.get(`/authors/id/${id}`);
        return { ...response.data.author, books: response.data.books } as Author;
    } catch (error) {
        return errorHandler(error as AxiosError);
    }
};
