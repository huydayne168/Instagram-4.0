import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";
const RootLayout = () => {
    return (
        <div className="h-screen flex bg-dark">
            <SideBar />
            <Outlet />
        </div>
    );
};

export default RootLayout;
