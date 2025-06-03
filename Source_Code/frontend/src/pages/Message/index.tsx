import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ChatUserList from "./ChatUserList";
import { User } from "../../models/User";
import { getAllUsers } from "../../services/userService";

const Message = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    useEffect(() => {
        const getUsers = async () => {
            try {
                const result = await getAllUsers();
                setUsers(result?.data.users);
            } catch (error) {
                console.log(error);
            }
        };

        getUsers();
    }, []);
    return (
        <div className="h-screen flex flex-1">
            <ChatUserList users={users} />
            <Outlet />
        </div>
    );
};

export default Message;
