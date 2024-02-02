import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test } from "vitest";
import AuthorForm from "../AuthorForm";
import { QueryClient, QueryClientProvider } from "react-query";

describe("(Author Form) Component", () => {
    const client = new QueryClient();
    test("Should display important inputs and button submit for author creation", () => {
        render(
            <QueryClientProvider client={client}>
                <MemoryRouter>
                    <AuthorForm />
                </MemoryRouter>
            </QueryClientProvider>
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
        expect(screen.getByRole("button",{name:"submit"})).toBeInTheDocument();
        expect(screen.getByRole("button",{name:"preview"})).toBeInTheDocument();
    });
});
