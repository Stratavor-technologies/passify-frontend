import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import DefaultLayout from "../Layout/DefaultLayout";
import { useAuth } from "../Hooks/AuthHook";
import { post2 } from "../axios";


export default function ProtectedRoutes({ handalRoute, children }) {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const fetchUserInfo = async () => {
        const responseUser = await post2("user/getUserInfo");
        if (responseUser.status === "success") {
            if (responseUser.data.status == 3 || responseUser.data.status == 4) {
                if (window.location.pathname != "/subscription") {
                    navigate("/subscription");
                }
            }
        } else if (responseUser.status === "error") {
            toast.error(responseUser.message);
        }
    };

    fetchUserInfo();

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }
    return <>
        <DefaultLayout>
            {children}
        </DefaultLayout>
    </>
}