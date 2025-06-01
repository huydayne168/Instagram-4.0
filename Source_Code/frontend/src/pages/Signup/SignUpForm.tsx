import { useState, useCallback, useEffect } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { signUp, validateSignUpData } from "../../services/signupService";
import SignUpFormDesc from "./SignUpFormDesc";
import { AxiosError } from "axios";
import loginService from "../../services/loginService";
import { useNavigate } from "react-router-dom";
// import useRedirect from "../../hooks/useRedirect";

const inputClassName =
    "w-64 p-2 border border-textGray rounded-sm focus:outline-none text-sm placeholder:text-sm";
const buttonClassName =
    "w-64 py-2 px-3 rounded-lg font-semibold bg-blue text-white";

const SignUpForm = () => {
    // const { gotoLoginPage } = useRedirect();
    const navigate = useNavigate();

    // Sign up form data:
    const [email, setEmail] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // validation states:
    const [errorMess, setErrorMess] = useState<string>("");
    const [disableSignUpButton, setDisableSignUpButton] =
        useState<boolean>(true);

    // Get inputs value functions:
    const getEmailHandler = useCallback((value: string) => {
        setEmail(value);
    }, []);
    const getFullNameHandler = useCallback((value: string) => {
        setFullName(value);
    }, []);
    const getUsernameHandler = useCallback((value: string) => {
        setUsername(value);
    }, []);
    const getPasswordHandler = useCallback((value: string) => {
        setPassword(value);
    }, []);

    // Disable button state:
    useEffect(() => {
        setDisableSignUpButton(
            email && fullName && username && password ? false : true
        );
        return () => {};
    }, [email, fullName, username, password]);

    // Handle Sign up when click sign up button
    const handleSignUp = useCallback(async () => {
        const signUpData = {
            email,
            fullName,
            username,
            password,
        };

        // Validate the sign up data:
        const validationResult = validateSignUpData(signUpData);
        if (!validationResult.success) {
            setErrorMess(validationResult.error.issues[0].message);
        } else {
            const result = await signUp(signUpData);
            // Check errors sent from server: (Check for duplicated emails or usernames)
            if (result instanceof AxiosError) {
                if (result.response?.data.message === "username")
                    setErrorMess("A user with that username already exists!");
                else if (result.response?.data.message === "email")
                    setErrorMess("A user with that email already exists!");
            }
        }

        // Navigate user to Login page:
        navigate("/login");
    }, [email, fullName, username, password]);

    return (
        <form action="#" className="flex flex-col items-center gap-2">
            <Button
                onClick={loginService.loginWithFacebook}
                content="Log in with Facebook"
                className={buttonClassName}
            />
            <div
                className="w-64 my-2 flex items-center 
                justify-between text-xs text-textGray before:content-[''] before:h-px before:w-24 before:bg-textGray 
                before:inline-block after:inline-block after:bg-textGray after:content-[''] after:h-px after:w-24"
            >
                OR
            </div>
            <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                getInputValueHandler={getEmailHandler}
                className={inputClassName}
            />
            <Input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                getInputValueHandler={getFullNameHandler}
                className={inputClassName}
            />
            <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                getInputValueHandler={getUsernameHandler}
                className={inputClassName}
            />
            <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                getInputValueHandler={getPasswordHandler}
                className={inputClassName}
            />
            {/* Sign up form description */}
            <SignUpFormDesc />
            <Button
                onClick={handleSignUp}
                content="Sign Up"
                disable={disableSignUpButton}
                className={buttonClassName}
            />
            {errorMess && (
                <div className="mt-4 px-4 text-sm text-errorText text-center">
                    {errorMess}
                </div>
            )}
        </form>
    );
};

export default SignUpForm;
