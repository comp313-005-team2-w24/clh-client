import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test } from "vitest";
import AuthorCard from "..";
import { Author } from "../../../interfaces/Author";

describe("(Author Card) Component", () => {
    test("Should display name and image", () => {
        const testAuthor = { name: "testName", imageUrl: "" } as Author;
        render(
            <MemoryRouter>
                <AuthorCard author={testAuthor} />
            </MemoryRouter>
        );
        expect(screen.getByText("testName")).toBeInTheDocument();
        expect(screen.getByRole("img")).toBeInTheDocument();
    });
});
