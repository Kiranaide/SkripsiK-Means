'use client'
import React, { useState } from "react";
import axios from "axios";
import cookieSession from "cookie-session";
import Cookies from "js-cookie";

const Login = () => {
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
            const response = await axios.post("/api/loginUser", formData);

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                document.cookie = `token=${response.data.token}; expires=Sun, 31 Dec 2023 23:59:59 GMT; path=/`;
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setLoginError("Invalid username or password");
        }
    };
    
    return (
        <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-5 bg-web-white dark:bg-web-black rounded-2xl px-8 py-8 w-[400px]">
          <h1 className="font-bold text-4xl text-web-black dark:text-web-white mb-6">Login</h1>
          <div className="flex flex-col gap-3">
            <label className="font-bold text-2xl text-web-black dark:text-web-white">Username</label>
            <input
              className="rounded-2xl bg-gray-200 dark:bg-gray-700 h-12 p-4 placeholder-opacity-30 text-web-black dark:text-web-white"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold text-2xl text-web-black dark:text-web-white">Password</label>
            <input
              className="rounded-2xl bg-gray-200 dark:bg-gray-700 h-12 p-4 placeholder-opacity-30 text-web-black dark:text-web-white"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button
              className="rounded-2xl bg-web-blue dark:bg-web-blue-dark h-12 w-full p-4 text-white font-bold"
              onClick={handleLogin}
            >
              Login
            </button>
            {loginError && <p className="text-red-500 mt-4">{loginError}</p>}
          </div>
        </div>
      </div>
    );
};

export default Login;
