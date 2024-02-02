import { render, screen, waitFor } from "@testing-library/react";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { describe, test, vi } from "vitest";
import AuthButtonContainer from "../AuthButtonContainer";
const testLoader = vi.fn();
beforeEach(()=>{
    testLoader.mockReset();
})
describe("(AuthButtonContainer) Component", () => {
    test("Should be displayed Logout button if user is authenticated", async () => {
        testLoader.mockResolvedValue({ isAuthenticated: true });
        const testRouter = createBrowserRouter(
            createRoutesFromElements(
                <>
                    <Route
                        path="/"
                        loader={testLoader}
                        element={<AuthButtonContainer />}
                    />
                </>
            )
        );
        render(<RouterProvider router={testRouter} />);
        await waitFor(() => {
            expect(screen.getByRole("button").textContent).toEqual("Logout");
        });
    });
    test("Should be displayed Logout button if user is authenticated", async () => {
        testLoader.mockResolvedValue({ isAuthenticated: false });
        const testRouter = createBrowserRouter(
            createRoutesFromElements(
                <>
                    <Route
                        path="/"
                        loader={testLoader}
                        element={<AuthButtonContainer />}
                    />
                </>
            )
        );
        render(<RouterProvider router={testRouter} />);
        await waitFor(() => {
            expect(screen.getByRole("button").textContent).toEqual("Login");
        });
    });
});
