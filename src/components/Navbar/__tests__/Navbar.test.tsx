import { render } from "@testing-library/react";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";
import { describe, test } from "vitest";
import Navbar from "..";

describe("(Navbar) Component", () => {
    test("Display all required nav link and logo", () => {
        const testLoader = vi.fn();
        testLoader.mockResolvedValue({ isAuthenticated: false });
        const testRouter = createBrowserRouter(
            createRoutesFromElements(
                <>
                    <Route path="/" loader={testLoader} element={<Navbar />} />
                </>
            )
        );
        render(<RouterProvider router={testRouter} />);
        const navBar = render(<RouterProvider router={testRouter} />);
        expect(navBar).toMatchSnapshot();
    });
});
