import { MemoryRouter } from "react-router-dom";
import { describe, test } from "vitest";
import BookForm from "../BookForm";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

describe("(Book Form) Component", () => {
    const client = new QueryClient();
    test("Should display required input", () => {
        render(
            <QueryClientProvider client={client}>
                <MemoryRouter>
                    <BookForm />
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(
            screen.getByRole("textbox", { name: "isbn" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("textbox", { name: "title" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("textbox", { name: "description" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("spinbutton", { name: "stock" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("spinbutton", { name: "price" })
        ).toBeInTheDocument();
        expect(screen.getByRole("date")).toBeInTheDocument();
        expect(
            screen.getByRole("select-controller").querySelector("#authorSelect")
        ).toBeInTheDocument();
    });
});
