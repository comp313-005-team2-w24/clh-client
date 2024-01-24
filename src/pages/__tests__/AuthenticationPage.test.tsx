import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import AuthenticationPage from "../AuthenticationPage";
import { MemoryRouter } from "react-router-dom";
describe("Authentication Page test", () => {
    test("Logo and description should be displayed", () => {
        render(
            <MemoryRouter>
                <AuthenticationPage />
            </MemoryRouter>
        );
        expect(screen.getByTestId("logo")).toBeInTheDocument();
        expect(screen.getByTestId("brief")).toBeInTheDocument();
    });
});