import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "..";

describe("(Navbar) Component", () => {
    test("Display all required nav link and logo", () => {
        const navBar = render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        expect(navBar).toMatchSnapshot();
    });
});
