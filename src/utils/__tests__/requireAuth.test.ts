import { AxiosError } from "axios";
import { describe, test, vi } from "vitest";
import axiosMocks from "../../mocks/axiosMockInstance";
import { requireAuth } from "../loaders/requireAuth";

describe("Loader test", () => {
    describe("Require Authentication Loader", () => {
        test("Redirect user to login page if token is null", async () => {
            axiosMocks.get.mockRejectedValue({} as AxiosError);
            vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => "");
            const response = await requireAuth();
            expect(response).toBeInstanceOf(Response);
        });
        test("Redirect user to login page if token is invalid", async () => {
            axiosMocks.get.mockRejectedValue({} as AxiosError);
            vi.spyOn(Storage.prototype, "getItem").mockImplementation(
                () => "invalidToken"
            );
            const response = await requireAuth();
            expect(response).toBeInstanceOf(Response);
        });
        test("Allow user to navigate if user already logged in", async () => {
            axiosMocks.get.mockResolvedValue({ data: { valid: true } });
            vi.spyOn(Storage.prototype, "getItem").mockImplementation(
                () => "validToken"
            );
            const response = await requireAuth();
            expect(response).toBeNull();
        });
    });
});
