import { AxiosError } from "axios";
import { axiosInstance } from "../../config/axiosInstance";
import { User } from "../../interfaces/User";
export type AuthenticationResponse = {
    success?: boolean;
    message?: string | undefined;
    error?: string;
    token?: string;
    valid?: boolean;
    permissions?: 0 | 1 | 2;
};

export const errorHandler = (error: AxiosError<AuthenticationResponse>) => {
    const errorResponse: AuthenticationResponse = {
        error: error.response?.data.error || "System Error",
    };
    return errorResponse;
};

export const createUser = async (user: User) => {
    try {
        const response = await axiosInstance.post(
            "/auth/createUser",
            JSON.stringify(user)
        );
        return response.data as AuthenticationResponse;
    } catch (error) {
        return errorHandler(error as AxiosError<AuthenticationResponse>);
    }
};
export const login = async (user: User) => {
    try {
        const response = await axiosInstance.post(
            "/auth/login",
            JSON.stringify(user)
        );
        return response.data as AuthenticationResponse;
    } catch (error) {
        return errorHandler(error as AxiosError<AuthenticationResponse>);
    }
};
export const validateToken = async (token: string) => {
    try {
        const response = await axiosInstance.get(
            `/auth/validateToken?token=${token}`
        );
        return response.data as AuthenticationResponse;
    } catch (error) {
        localStorage.removeItem("token");
        return errorHandler(error as AxiosError<AuthenticationResponse>);
    }
};
