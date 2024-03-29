import { AxiosError } from "axios";
import { axiosInstance } from "../../config/axiosInstance";
import { Author } from "../../interfaces/Author";
import { Book } from "../../interfaces/Book";
import bearerTokenConfig from "../../config/adminToken";

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
    const config = bearerTokenConfig();
    try {
        const response = await axiosInstance.post(
            "/authors",
            JSON.stringify(author),
            config
        );
        return response.data;
    } catch (error) {
        return errorHandler(error as AxiosError);
    }
};
export const getAuthorById = async (id: string): Promise<{author:Author,books:Book[]}> => {
    try {
        const response = await axiosInstance.get(`/authors/id/${id}`);
        return response.data;
    } catch (error) {
        return errorHandler(error as AxiosError);
    }
};
