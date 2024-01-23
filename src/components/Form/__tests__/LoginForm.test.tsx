import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import LoginForm from "../LoginForm";
import { MemoryRouter } from "react-router-dom";
import * as login from "../../../services/apis/AuthenticationAPI";
import { AxiosError, AxiosResponse } from "axios";
describe("(Component) Login Form", () => {
    test("Should be rendered all key login form elements", () => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        expect(screen.getByTestId("email")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByTestId("login-btn")).toBeInTheDocument();
    });
    test("Should be rendered error message when email input is wrong format", async () => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        const emailInput = screen.getByTestId("email");
        const password = screen.getByTestId("password");

        const button = screen.getByTestId("login-btn");
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
        fireEvent.click(button);
        await screen.findByText("Invalid Email");
    });
    test("Error should display if login failed", async () => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        //set up login mock
        const loginMock = vi.spyOn(login, "login");
        const serverError = new AxiosError();
        serverError.response = {
            status: 500,
        } as AxiosResponse;
        loginMock.mockResolvedValue({ error: "Error Test" });
        //user interaction
        const emailInput = screen.getByTestId("email");
        const password = screen.getByTestId("password");

        const button = screen.getByTestId("login-btn");
        fireEvent.change(emailInput, {
            target: {
                value: "test@gmail.com",
            },
        });
        fireEvent.change(password, {
            target: {
                value: "123456",
            },
        });
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByTestId("alert")).toBeInTheDocument();
        });
    });
});
