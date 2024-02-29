import { AxiosError } from "axios";
import bearerTokenConfig from "../../config/adminToken";
import { axiosInstance } from "../../config/axiosInstance";
import { Category } from "../../interfaces/Category";

const errorHandler = (error: AxiosError) => {
    if (error.response?.status === 500) {
        throw new Error("Something went wrong with server");
    }
    throw new Error("System error ! Please try again");
};
export const getCategoryById = async (id: string | number) => {
    try {
        const response = await axiosInstance.get(`/categories/${id}`);
        return response.data as Category;
    } catch (error) {
        errorHandler(error as AxiosError);
    }
};
export const getAllCategories = async () => {
    try {
        const response = await axiosInstance.get("/categories");
        return response.data as Category[];
    } catch (error) {
        errorHandler(error as AxiosError);
    }
};
export const addCategory = async (category: Category) => {
    try {
        const response = await axiosInstance.post(
            "/categories",
            JSON.stringify(category),
            bearerTokenConfig()
        );
        return response.data as Category;
    } catch (error) {
        errorHandler(error as AxiosError);
    }
};
export const updateCategory = async (
    id: string | number,
    category: Category
) => {
    try {
        const response = await axiosInstance.put(
            `/categories/${id}`,
            JSON.stringify(category),
            bearerTokenConfig()
        );
        return response.data as Category;
    } catch (error) {
        errorHandler(error as AxiosError);
    }
};
export const deleteCategory = async (id: string | number) => {
    try {
        const response = await axiosInstance.delete(
            `/categories/${id}`,
            bearerTokenConfig()
        );
        return response.data as Category;
    } catch (error) {
        errorHandler(error as AxiosError);
    }
};
