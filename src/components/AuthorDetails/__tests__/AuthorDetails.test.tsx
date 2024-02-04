import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AuthorDetails from "..";
import { Author } from "../../../interfaces/Author";
import * as getAuthor from "../../../services/apis/AuthorAPI";
describe("(Author Details) Component", () => {
    test("Should display author name, image and biography", async () => {
        const authorResponse: Author = {
            author_id: 1,
            name: "test",
            biography: "testing",
        };
        const client = new QueryClient();
        vi.spyOn(getAuthor, "getAuthorById").mockResolvedValue(authorResponse);
        render(
            <QueryClientProvider client={client}>
                <MemoryRouter initialEntries={[`/authors/1`]}>
                    <Routes>
                        <Route
                            path="/authors/:id"
                            element={<AuthorDetails />}
                        />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => {
            expect(screen.getByRole("authorName").textContent).toStrictEqual(
                authorResponse.name
            );
            expect(
                screen.getByRole("img", { name: "authorImage" })
            ).toBeInTheDocument();
            expect(
                screen.getByRole("article", { name: "biography" }).textContent
            ).toStrictEqual(authorResponse.biography);
        });
    });
});
