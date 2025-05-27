import SignUpForm from "./SignUpForm";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

import "@testing-library/jest-dom";
// import { describe, expect, it } from "vitest";

// Test disable sign up button:
describe("Check Sign up button", () => {
    it("check initial sign up button", () => {
        render(
            <BrowserRouter>
                <SignUpForm />
            </BrowserRouter>
        );

        const signUpButton = screen.getByRole("button", { name: /sign up/i });

        expect(signUpButton).toHaveClass("opacity-70");
    });

    it("check to enable sign up button", () => {
        render(
            <BrowserRouter>
                <SignUpForm />
            </BrowserRouter>
        );
        const emailInput = screen.getByPlaceholderText("Email");
        const fullNameInput = screen.getByPlaceholderText("Full Name");
        const usernameInput = screen.getByPlaceholderText("Username");
        const passwordInput = screen.getByPlaceholderText("Password");
        const signUpButton = screen.getByRole("button", { name: /sign up/i });

        // type in to all inputs:
        fireEvent.change(emailInput, { target: { value: "12345..." } });
        fireEvent.change(fullNameInput, { target: { value: "12345..." } });
        fireEvent.change(usernameInput, { target: { value: "12345..." } });
        fireEvent.change(passwordInput, { target: { value: "12345..." } });

        expect(signUpButton).not.toHaveClass("opacity-70");
    });
});
