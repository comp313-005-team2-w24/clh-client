import { describe, test, expect } from "vitest";
import axiosMocks from "../../../mocks/axiosMockInstance";
import {
    createUser,
    login,
    validateToken,
    errorHandler,
    AuthenticationResponse,
} from "../AuthenticationAPI";
import { User } from "../../../interfaces/User";
import { AxiosError, AxiosResponse } from "axios";
beforeEach(() => {
    axiosMocks.post.mockReset();
    axiosMocks.get.mockReset();
});
describe("Authentication API test", () => {
    test("Should call POST and return data with success status and message", async () => {
        const response = { data: { success: true, message: "test" } };
        const testUser: User = {
            username: "test",
            email: "test@gmail.com",
            password: "123456",
        };
        axiosMocks.post.mockResolvedValue(response);
        const data = await createUser(testUser);
        expect(axiosMocks.post).toHaveBeenCalledTimes(1);
        expect(data).toStrictEqual(response.data);
        expect(axiosMocks.post).toBeCalledWith(
            "/auth/createUser",
            JSON.stringify(testUser)
        );
    });
    test("Should call POST and return a token", async () => {
        const response = { data: { token: "testToken" } };
        const testUser = {
            email: "test@gmail.com",
            password: "123456",
        } as User;
        axiosMocks.post.mockResolvedValue(response);
        const { token } = await login(testUser);
        expect(axiosMocks.post).toBeCalledTimes(1);
        expect(token).toStrictEqual(response.data.token);
        expect(axiosMocks.post).toBeCalledWith(
            "/auth/login",
            JSON.stringify(testUser)
        );
    });
    test("Should call GET and return a boolean as validity", async () => {
        const response = { data: { valid: true } };
        const token = "testToken";
        axiosMocks.get.mockResolvedValue(response);
        const { valid } = await validateToken(token);
        expect(axiosMocks.get).toBeCalledTimes(1);
        expect(valid).toStrictEqual(response.data.valid);
        expect(axiosMocks.get).toBeCalledWith(`/auth/validateToken?token=${token}`);
    });
    test("Should return appropriate error", async () => {
        const error = {} as AxiosError<AuthenticationResponse>;
        const errorMessage = "test";
        error.response = {
            status: 401,
            data: {
                error: errorMessage,
            },
        } as AxiosResponse;
        const errResponse = errorHandler(error);
        expect(errResponse.error).not.toBeNull();
    });
});
