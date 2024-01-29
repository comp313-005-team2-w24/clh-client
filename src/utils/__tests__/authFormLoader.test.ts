import { describe, test, vi } from "vitest";
import axiosMocks from "../../mocks/axiosMockInstance";
import { authFormLoader } from "../loaders/authFormLoader";
import { AxiosError } from "axios";

describe("Loader test", () => {
    describe("Authentication Form Loader", () => {
        test("Allow user to access if token is null", async () => {
            axiosMocks.get.mockRejectedValue({} as AxiosError);
            vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => "");
            const response = await authFormLoader();
            expect(response).toBeNull();
        });
        test("Allow user to access if token is invalid", async () => {
            axiosMocks.get.mockRejectedValue({} as AxiosError);
            vi.spyOn(Storage.prototype, "getItem").mockImplementation(
                () => "invalidToken"
            );
            const response = await authFormLoader();
            expect(response).toBeNull();
        });
        test("Deny user to access if user already logged in", async () => {
            axiosMocks.get.mockResolvedValue({ data: { valid: true } });
            vi.spyOn(Storage.prototype, "getItem").mockImplementation(
                () => "validToken"
            );
            const response = await authFormLoader();
            expect(response).toBeInstanceOf(Response);
        });
    });
});
