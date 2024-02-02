import { AxiosError } from "axios";
import { describe, test, vi } from "vitest";
import axiosMocks from "../../mocks/axiosMockInstance";
import { authenticationCheck } from "../loaders/authenticationCheck";

describe("Loader test", () => {
    describe("Authentication Check Loader", () => {
        test("Return isAuthenticated is false if token is null", async () => {
            axiosMocks.get.mockRejectedValue({} as AxiosError);
            vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => "");
            const {isAuthenticated} = await authenticationCheck();
            expect(isAuthenticated).toBeFalsy();
        });
        test("Return isAuthenticated is false if token is invalid", async () => {
            axiosMocks.get.mockRejectedValue({} as AxiosError);
            vi.spyOn(Storage.prototype, "getItem").mockImplementation(
                () => "invalidToken"
            );
            const {isAuthenticated} = await authenticationCheck();
            expect(isAuthenticated).toBeFalsy();
        });
        test("Return isAuthenticated is true if user already logged in", async () => {
            axiosMocks.get.mockResolvedValue({ data: { valid: true } });
            vi.spyOn(Storage.prototype, "getItem").mockImplementation(
                () => "validToken"
            );
            const {isAuthenticated} = await authenticationCheck();
            expect(isAuthenticated).toBeTruthy();
        });
    });
});
