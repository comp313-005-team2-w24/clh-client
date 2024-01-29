import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import AuthButtonContainer from "../AuthButtonContainer";
import { AuthContext } from "../../../context/AuthenticationContext";
import { MemoryRouter } from "react-router-dom";

describe("(AuthButtonContainer) Component", () => {
    const testValues = {
        isAuthenticated: true,
        token: "testToken",
        setNewToken: () => {},
    };
    test("Should be displayed Logout button if user is authenticated", () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={testValues}>
                    <AuthButtonContainer />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getByRole("button").textContent).toEqual("Logout");
    });
    test("Should be displayed Logout button if user is authenticated", () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider
                    value={{ ...testValues, isAuthenticated: false, token: "" }}
                >
                    <AuthButtonContainer />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getByRole("button").textContent).toEqual("Login");
    });
});
