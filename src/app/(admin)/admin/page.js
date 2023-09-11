'use client'
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const RedirectComponent = ({ to }) => {
    useEffect(() => {
        window.location.replace(to);
    }, []);

    return null;
};

const Admin = () => {
    const [redirectTo, setRedirectTo] = useState(null);

    useEffect(() => {
        const token = Cookies.get("tokenAdmin");
        if (!token) {
            setRedirectTo("/admin/login");
        }
    }, []);

    if (redirectTo) {
        return <RedirectComponent to={redirectTo} />;
    }

    return (
        <div>
            <h1>Admin Menu</h1>
        </div>
    );
};

export default Admin;
