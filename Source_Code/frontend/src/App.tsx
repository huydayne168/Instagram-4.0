import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Message from "./pages/Message";
import ChatBox from "./pages/Message/Chatbox";
import { useSocket } from "./hooks/useSocket";
import { useAppSelector } from "./hooks/useStore";

const router = createBrowserRouter([
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "",
                element: <Home />,
                index: true,
            },
            {
                path: "profile/:_id",
                element: <Profile />,
            },
            {
                path: "message",
                element: <Message />,
                children: [
                    {
                        path: ":user_id",
                        element: <ChatBox />,
                    },
                ],
            },
        ],
    },
]);

function App() {
    const userId = useAppSelector((state) => state.authSlice.userInfo?._id);
    useSocket(userId);
    return <RouterProvider router={router} />;
}

export default App;
