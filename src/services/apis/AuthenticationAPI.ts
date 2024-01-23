import { AxiosError } from "axios";
import { axiosInstance } from "../../config/axiosInstance";
import { User } from "../../interfaces/User";
type AuthenticationResponse = {
    success?: boolean;
    message?: string | undefined;
    error?: string;
    token?: string;
    valid?: boolean;
};

const errorHandler = (error: AxiosError | unknown) => {
    if (error instanceof AxiosError) {
        const errorResponse: AuthenticationResponse = {
            error:
                error.response?.data.error ||
                "Something went wrong with server",
        };
        return errorResponse;
    }
    return {
        error: "Connection error ! Please try again",
    } as AuthenticationResponse;
};

export const createUser = async (user: User) => {
    try {
        const response = await axiosInstance.post(
            "/auth/createUser",
            JSON.stringify(user)
        );
        return response.data as AuthenticationResponse;
    } catch (error) {
        return errorHandler(error);
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
        return errorHandler(error);
    }
};
export const validateToken = async (token: string) => {
    try {
        const response = await axiosInstance.get(
            `/auth/validateToken?token=${token}`
        );
        return response.data as AuthenticationResponse;
    } catch (error) {
        return errorHandler(error);
    }
};
