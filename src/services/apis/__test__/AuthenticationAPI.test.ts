import { describe, test, expect, beforeEach, vi } from "vitest";
import { createUser, login, validateToken } from "../AuthenticationAPI";
import { User } from "../../../interfaces/User";
const mocks = vi.hoisted(() => ({
    post: vi.fn(),
    get: vi.fn(),
}));
//mock axios setup
vi.mock("axios", async (importActual) => {
    const actual = await importActual<typeof import("axios")>();
    const mockAxios = {
        default: {
            ...actual.default,
            create: vi.fn(() => ({
                ...actual.default.create(),
                get: mocks.get,
                post: mocks.post,
            })),
        },
    };

    return mockAxios;
});
beforeEach(() => {
    mocks.post.mockReset();
    mocks.get.mockReset();
});
describe("Authentication API test", () => {
    describe("Create account function test", () => {
        test("Should call POST and return data with success status and message", async () => {
            const response = { data: { success: true, message: "test" } };
            const testUser: User = {
                username: "test",
                email: "test@gmail.com",
                password: "123456",
            };
            mocks.post.mockResolvedValue(response);
            const data = await createUser(testUser);
            expect(mocks.post).toHaveBeenCalledTimes(1);
            expect(data).toStrictEqual(response.data);
            expect(mocks.post).toBeCalledWith(
                "/auth/createUser",
                JSON.stringify(testUser)
            );
        });
    });
    describe("Login function test", () => {
        test("Should call POST and return a token", async () => {
            const response = { data: { token: "testToken" } };
            const testUser = {
                email: "test@gmail.com",
                password: "123456",
            } as User;
            mocks.post.mockResolvedValue(response);
            const { token } = await login(testUser);
            expect(mocks.post).toBeCalledTimes(1);
            expect(token).toStrictEqual(response.data.token);
            expect(mocks.post).toBeCalledWith(
                "/auth/login",
                JSON.stringify(testUser)
            );
        });
    });
    describe("Validate jwt token", () => {
        test("Should call GET and return a boolean as validity", async () => {
            const response = { data: { valid: true } };
            const token = "testToken";
            mocks.get.mockResolvedValue(response);
            const { valid } = await validateToken(token);
            expect(mocks.get).toBeCalledTimes(1);
            expect(valid).toStrictEqual(response.data.valid);
            expect(mocks.get).toBeCalledWith(
                `/auth/validateToken?token=${token}`
            );
        });
    });
});
