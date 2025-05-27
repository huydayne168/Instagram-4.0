import { z } from "zod";
import http from "../lib/axios/http";
import { AxiosError } from "axios";

// Log in with Facebook: (======== This feature will be done later ========);
const loginWithFacebook = async (data: any) => {
    try {
        const response = await http.post("/auth/login-with-facebook", {
            accessToken: data.accessToken,
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
};

// Login Data validation:
const loginDataSchema = z.object({
    username: z.string().min(1, { message: "Your username is required!" }),
    password: z.string().min(1, { message: "Your password is required!" }),
});

type LoginData = z.infer<typeof loginDataSchema>;

// Validate Login Data:
const validateLoginData = (data: LoginData) => {
    const result = loginDataSchema.safeParse(data);
    return result;
};

// Login:
const login = async (data: LoginData) => {
    try {
        const response = await http.post("/auth/login", data, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });
        console.log(response);
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError && error.response?.status === 401) {
            if (error.response.data.message === "username") {
                return {
                    success: false,
                    data: "Sorry, your username was incorrect. Please double-check your username.",
                };
            } else if (error.response.data.message === "password") {
                return {
                    success: false,
                    data: "Sorry, your password was incorrect. Please double-check your password.",
                };
            }
        }
    }
};

export { loginWithFacebook, validateLoginData, login };
