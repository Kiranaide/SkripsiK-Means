'use client'
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [showSuccessModal, setShowSuccessModal] = useState(false);    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleCloseModal = () => {
        setShowSuccessModal(false); 
    };
    const handleRegister = async () => {
        try {
            const response = await axios.post("/api/registerAdmin", formData);
            console.log(response.data);
                if (response.data.success) {
                    setShowSuccessModal(true); 
                }
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
             {showSuccessModal && (
                    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
                        <div className="bg-white p-8 rounded-md shadow-md">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-web-black">Welcome Admin</h2>
                                <p className="text-xl font-normal text-web-black">Pendaftaran anda telah berhasil!</p>
                            </div>
                            <Link href="/login/" className="mt-4 bg-web-black text-white rounded-md px-8 py-4" onClick={handleCloseModal}>
                                Close
                            </Link>
                        </div>
                    </div>
                )}
            <div className="flex flex-col gap-5">
                <h1 className="font-bold text-4xl">Register</h1>
                <div className="flex flex-col gap-3">
                    <label className="font-bold text-2xl">Username</label>
                    <input
                        className="rounded-2xl bg-web-black h-12 w-1/2 p-4"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="font-bold text-2xl">Password</label>
                    <input
                        className="rounded-2xl bg-web-black h-12 w-1/2 p-4"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="font-bold text-2xl">Confirm Password</label>
                    <input
                        className="rounded-2xl bg-web-black h-12 w-1/2 p-4"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button className="rounded-2xl bg-web-black h-12 w-1/2 p-4" onClick={handleRegister}>
                        Register
                    </button>
                </div>
            </div>
           
        </div>
    );
};

export default Register;
