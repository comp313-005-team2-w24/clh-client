import { AxiosError } from "axios";
import { axiosInstance } from "../../config/axiosInstance";
import { User } from "../../interfaces/User";

export const createUser = async (user: User) => {
    try {
        const response = await axiosInstance.post(
            "/auth/createUser",
            JSON.stringify(user)
        );
        return response.data as { success: boolean; message: string };
    } catch (error) {
        throw error as AxiosError;
    }
};
export const login = async (user: User) => {
    try {
        const response = await axiosInstance.post(
            "/auth/login",
            JSON.stringify(user)
        );
        return response.data as { token: string };
    } catch (error) {
        throw error as AxiosError;
    }
};
export const validateToken = async (token: string) => {
    try {
        const response = await axiosInstance.get(
            `/auth/validateToken?token=${token}`
        );
        return response.data as { token: string };
    } catch (error) {
        throw error as AxiosError;
    }
};
