import { useEffect } from "react";
import { socket } from "../socket/socket";

export const useSocket = (userId?: string) => {
    useEffect(() => {
        console.log("useSocket called with userId:", userId);
        if (!userId) {
            return;
        }
        socket.emit("addUser", userId);

        return () => {
            socket.disconnect();
        };
    }, [userId]);
};
