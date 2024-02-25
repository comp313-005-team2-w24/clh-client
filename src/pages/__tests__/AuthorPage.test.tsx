import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { describe, test } from "vitest";
import { Author } from "../../interfaces/Author";
import axiosMocks from "../../mocks/axiosMockInstance";
import * as authenticationCheck from "../../utils/loaders/authenticationCheck";
import * as requireAdmin from "../../utils/loaders/requireAdmin";
import AuthorPage from "../AuthorPage";
import AuthorsList from "../AuthorPage/AuthorsList";
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
        vi.spyOn(authenticationCheck, "authenticationCheck").mockResolvedValue({
            isAuthenticated: true,
        });
        vi.spyOn(requireAdmin, "requireAdmin").mockResolvedValue({
            isAuthenticated: true,
        });
        const client = new QueryClient();
        const router = createBrowserRouter(
            createRoutesFromElements(
                <>
                    <Route
                        loader={authenticationCheck.authenticationCheck}
                        element={<AuthorPage />}
                        id="author"
                    >
                        <Route
                            loader={requireAdmin.requireAdmin}
                            index
                            element={<AuthorsList />}
                        />
                    </Route>
                </>
            )
        );
        render(
            <QueryClientProvider client={client}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        );
        await waitFor(() => {
            expect(screen.getByText(testResponse[0].name)).toBeInTheDocument();
            expect(screen.getByText(testResponse[1].name)).toBeInTheDocument();
            expect(
                screen.getByRole("button", { name: "addAuthor" })
            ).toBeInTheDocument();
        });
    });
});
