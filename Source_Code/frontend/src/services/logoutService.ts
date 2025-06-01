import { AxiosInstance } from "axios";
import { z } from "zod";

// Log out validation:
const logoutSchema = z.object({
    _id: z.string().min(1, {
        message: "Your _id is required, the _id is not here!",
    }),
});

type LogoutDataType = z.infer<typeof logoutSchema>;

const validateLogoutData = (data: LogoutDataType) => {
    const result = logoutSchema.safeParse(data);
    return result;
};

const logout = async (privateHttp: AxiosInstance, data: LogoutDataType) => {
    try {
        const response = await privateHttp.post("/auth/logout", data, {
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
        return {
            success: false,
            data: "Sorry, something went wrong. Please try again later!",
        };
    }
};

export { validateLogoutData, logout };
