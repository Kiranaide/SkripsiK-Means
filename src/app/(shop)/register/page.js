'use client'
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        namapelanggan: "",
        password: "",
        confirmPassword: "",
        nomortelp: ""
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
            const response = await axios.post("/api/registerUsers", formData);
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
              <h2 className="text-2xl font-bold mb-4 text-web-black">Registration Successful!</h2>
              <p className="text-xl font-normal text-web-black">Pendaftaran anda telah berhasil!</p>
            </div>
            <Link href="/login/" className="mt-4 bg-web-black text-white rounded-md px-8 py-4" onClick={handleCloseModal}>
              Close
            </Link>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-5 bg-web-white dark:bg-web-black rounded-2xl px-8 py-8 w-[400px]">
        <h1 className="font-bold text-4xl text-web-black dark:text-web-white mb-6">Register</h1>
        <div className="flex flex-col gap-3">
          <label className="font-bold text-2xl text-web-black dark:text-web-white">Nama Lengkap</label>
          <input
            className="rounded-2xl bg-gray-200 dark:bg-gray-700 h-12 p-4 text-web-black dark:text-web-white"
            type="text"
            name="namapelanggan"
            value={formData.namapelanggan}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-bold text-2xl text-web-black dark:text-web-white">Username</label>
          <input
            className="rounded-2xl bg-gray-200 dark:bg-gray-700 h-12 p-4 text-web-black dark:text-web-white"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-bold text-2xl text-web-black dark:text-web-white">Password</label>
          <input
            className="rounded-2xl bg-gray-200 dark:bg-gray-700 h-12 p-4 text-web-black dark:text-web-white"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-bold text-2xl text-web-black dark:text-web-white">Confirm Password</label>
          <input
            className="rounded-2xl bg-gray-200 dark:bg-gray-700 h-12 p-4 text-web-black dark:text-web-white"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="font-bold text-2xl text-web-black dark:text-web-white">Nomor Telepon</label>
          <input
            className="rounded-2xl bg-gray-200 dark:bg-gray-700 h-12 p-4 text-web-black dark:text-web-white"
            type="text"
            name="nomortelp"
            value={formData.nomortelp}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button
            className="rounded-2xl bg-web-blue dark:bg-web-black-darker h-12 w-full p-4 text-white font-bold"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>
    );
};

export default Register;
