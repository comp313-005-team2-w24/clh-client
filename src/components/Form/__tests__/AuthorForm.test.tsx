import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test } from "vitest";
import AuthorForm from "../AuthorForm";

describe("(Author Form) Component", () => {
    test("Should display important inputs and button submit for author creation", () => {
        render(
            <MemoryRouter>
                <AuthorForm />
            </MemoryRouter>
        );
        expect(
            screen.getByRole("textbox", { name: "authorName" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("textbox", { name: "imageUrl" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("textbox", { name: "biography" })
        ).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });
});
