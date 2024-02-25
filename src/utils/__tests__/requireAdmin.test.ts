import { describe, test, vi } from "vitest";
import { requireAdmin } from "../loaders/requireAdmin";

describe("Require admin token loader test", () => {
    test("Should return true if localStorage admin token is valid", async () => {
        const testToken = "test";
        vi.spyOn(Storage.prototype, "getItem").mockImplementation(
            () => testToken
        );
        vi.stubEnv("VITE_ADMIN_TOKEN", testToken);
        const { isAuthenticated } = await requireAdmin();
        expect(isAuthenticated).toBeTruthy();
    });
    test("Should return false if localStorage admin token is invalid", async () => {
        const testToken = "test";
        vi.spyOn(Storage.prototype, "getItem").mockImplementation(
            () => "invalid"
        );
        vi.stubEnv("VITE_ADMIN_TOKEN", testToken);
        const { isAuthenticated } = await requireAdmin();
        expect(isAuthenticated).toBeFalsy();
    });
});
