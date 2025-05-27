import http from "../lib/axios/http";
import { z } from "zod";

// Sign up validation:
const signUpDataSchema = z.object({
    email: z.string().email({ message: "Your email is not valid!" }),
    fullName: z.string().min(3, {
        message: "Your full name must be at least 3 characters long!",
    }),
    username: z.string().min(3, {
        message: "Your username must be at least 3 characters long!",
    }),
    password: z.string().regex(/^[a-zA-Z0-9]{8,30}$/, {
        message:
            "Your password must includes letters, numbers and at least 8 characters long! ",
    }),
});
type SignupData = z.infer<typeof signUpDataSchema>;

// Validate Sign up data:
export const validateSignUpData = (data: SignupData) => {
    const result = signUpDataSchema.safeParse(data);
    return result;
};

// Sign up call api Handler:
export const signUp = async (data: SignupData) => {
    try {
        const response = await http.post("/auth/sign-up", data);
        return response;
    } catch (error) {
        console.log("error here");
        return error;
    }
};
