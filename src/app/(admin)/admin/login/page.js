'use client'
import React, { useState } from "react";
import axios from "axios";
import cookieSession from "cookie-session";
import Cookies from "js-cookie";

const LoginAdmin = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [loginError, setLoginError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("/api/loginAdmin", formData);

            if (response.data.success) {
                localStorage.setItem("tokenAdmin", response.data.token);
                document.cookie = `tokenAdmin=${response.data.token}; expires=Sun, 31 Dec 2023 23:59:59 GMT; path=/`;
                window.location.href = "/admin";
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setLoginError("Invalid username or password");
        }
    };

    return (
    <div className="my-32 bg-web-black dark:bg-web-white rounded-2xl px-8 py-8 w-[600px] h-auto container">
        <div className="flex flex-col">
            <div className="flex items-center justify-center">
                <h1 className="text-4xl font-bold text-web-black mb-6">Admin Login</h1>
            </div>
            <div className="flex flex-col gap-4 text-web-black font-medium">
                <div className="flex flex-col gap-3">
                    <label className="font-bold text-2xl">Username</label>
                    <input
                        className="px-4 h-14 rounded-xl border-2 placeholder-text-web-black placeholder-opacity-30"
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="font-bold text-2xl">Password</label>
                    <input
                        className="px-4 h-14 rounded-xl border-2 placeholder-text-web-black placeholder-opacity-30"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button className="h-14 w-full rounded-xl bg-web-blue text-web-white font-bold text-xl" onClick={handleLogin}>
                        Login
                    </button>
                    {loginError && <p className="text-red-500">{loginError}</p>}
                </div>
            </div>
        </div>
    </div>
    );
};

export default LoginAdmin;