import React from "react";
import Header from "../Components/Navigation/Header";
import Sidebar from "../Components/Navigation/Sidebar";

const DefaultLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="flex w-[100%]">
                <Sidebar />
                {children}
            </div>
        </>
    );
};

export default DefaultLayout;
