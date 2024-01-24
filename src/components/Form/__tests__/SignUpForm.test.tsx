import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUpForm from "../SignUpForm";
import { AxiosError, AxiosResponse } from "axios";
import * as createUser from "../../../services/apis/AuthenticationAPI";

describe("(SignUpForm) Component", () => {
    test("Should be rendered all key sign up form elements", () => {
        render(
            <MemoryRouter>
                <SignUpForm />
            </MemoryRouter>
        );
        expect(screen.getByTestId("email")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByTestId("confirmPassword")).toBeInTheDocument();
        expect(screen.getByTestId("signUp-btn")).toBeInTheDocument();
        expect(screen.getByTestId("username")).toBeInTheDocument();
    });
    test("Should be rendered appropriate error message for each input", async () => {
        render(
            <MemoryRouter>
                <SignUpForm />
            </MemoryRouter>
        );
        const emailInput = screen.getByTestId("email");
        const password = screen.getByTestId("password");
        const confirmPassword = screen.getByTestId("confirmPassword");
        const username = screen.getByTestId("username");
        const button = screen.getByTestId("signUp-btn");
        fireEvent.change(emailInput, {
            target: {
                value: "invalidEmail",
            },
        });
        fireEvent.change(password, {
            target: {
                value: "123456",
            },
        });
        fireEvent.change(confirmPassword, {
            target: {
                value: "321654",
            },
        });
        fireEvent.change(username, {
            target: {
                value: "",
            },
        });
        fireEvent.click(button);
        await screen.findByText("Invalid Email");
        await screen.findByText("Both password must match");
        await screen.findByText("User name is required");
    });
    test("Error should display if sign up failed", async () => {
        render(
            <MemoryRouter>
                <SignUpForm />
            </MemoryRouter>
        );
        //set up login mock
        const createUserMock = vi.spyOn(createUser, "createUser");
        const serverError = new AxiosError();
        serverError.response = {
            status: 500,
        } as AxiosResponse;
        createUserMock.mockResolvedValue({ error: "Error Test" });
        //user interaction
        const emailInput = screen.getByTestId("email");
        const password = screen.getByTestId("password");
        const confirmPassword = screen.getByTestId("confirmPassword");
        const username = screen.getByTestId("username");
        const button = screen.getByTestId("signUp-btn");
        fireEvent.change(emailInput, {
            target: {
                value: "validEmail@gmail.com",
            },
        });
        fireEvent.change(password, {
            target: {
                value: "123456",
            },
        });
        fireEvent.change(confirmPassword, {
            target: {
                value: "123456",
            },
        });
        fireEvent.change(username, {
            target: {
                value: "user",
            },
        });
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByTestId("alert")).toBeInTheDocument();
        });
    });
});
