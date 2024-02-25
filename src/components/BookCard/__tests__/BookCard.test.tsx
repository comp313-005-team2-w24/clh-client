import { QueryClient, QueryClientProvider } from "react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test } from "vitest";
import BookCard from "..";
import { Book } from "../../../interfaces/Book";
import * as AuthorAPI from "../../../services/apis/AuthorAPI";
import { Author } from "../../../interfaces/Author";
describe("(Book Card) Component", () => {
    const booksTest: Book[] = [
        {
            book_id: 1,
            isbn: "test",
            title: "testTitle",
            description: "testDesc",
            publicationDate: "1000",
            price: 1.1,
            stockQuantity: 10,
            authorIds: [1],
        },
    ];
    const authorTest: Author = {
        author_id: 1,
        name: "test",
        biography: "testing",
    };
    test("Should display required information for a book card", async () => {
        const client = new QueryClient();
        vi.spyOn(AuthorAPI, "getAuthorById").mockResolvedValue({
            author: authorTest,
            books: booksTest,
        });
        render(
            <QueryClientProvider client={client}>
                <MemoryRouter>
                    <BookCard book={booksTest[0]} />
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(
            screen.getByRole("generic", { name: "status" }).textContent
        ).toEqual("Available");
        expect(screen.getByRole("img")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "title" }).textContent).toEqual(
            booksTest[0].title
        );
        expect(
            screen.getByRole("button", { name: "addToCart" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("generic", { name: "price" }).textContent
        ).toEqual(`$${booksTest[0].price}`);
        await waitFor(() => {
            expect(
                screen.getByRole("link", { name: "author" }).textContent
            ).toEqual(authorTest.name);
        });
    });
});
