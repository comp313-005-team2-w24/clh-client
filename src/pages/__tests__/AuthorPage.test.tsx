import { describe, test } from "vitest";
import axiosMocks from "../../mocks/axiosMockInstance";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Author } from "../../interfaces/Author";
import AuthorsList from "../AuthorPage/AuthorsList";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthorPage from "../AuthorPage";
beforeEach(() => {
    axiosMocks.get.mockReset();
});
describe("Initial Author Page", () => {
    test("Should display a list of author", async () => {
        const testResponse: Author[] = [
            {
                author_id: 1,
                name: "test1",
                biography: "testing",
            },
            {
                author_id: 2,
                name: "test2",
                biography: "testing",
            },
        ];
        axiosMocks.get.mockResolvedValue({ data: testResponse });
        const client = new QueryClient();
        render(
            <QueryClientProvider client={client}>
                <MemoryRouter>
                    <AuthorsList />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => {
            expect(screen.getByText(testResponse[0].name)).toBeInTheDocument();
            expect(screen.getByText(testResponse[1].name)).toBeInTheDocument();
        });
    });
});
