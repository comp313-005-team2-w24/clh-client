import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test } from "vitest";
import AuthorCard from "..";

describe("(Author Card) Component", () => {
    test("Should display name and image", () => {
        render(
            <MemoryRouter>
                <AuthorCard name="testName" />
            </MemoryRouter>
        );
        expect(screen.getByText("testName")).toBeInTheDocument();
        expect(screen.getByRole("img")).toBeInTheDocument();
    });
});
