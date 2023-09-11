'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Pelanggan = () => {
    const [dataPelanggan, setPelanggan] = useState([]);

    useEffect(() => {
        getData();
    }, []);


    const getData = async () => {
        try {
            const response = await axios.get('/api/fetchPelanggan');
            setPelanggan(response.data);
        }
        catch (error) {
            console.log('error!', error)
        }
    }

    return (
        <div className="my-40">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl">Data Pelanggan</h1>
            </div>
            <div className="my-8">
                <table className="w-full text-center table-auto">
                    <thead>
                        <tr className="border-b-2 border-gray-400">
                            <th className="py-5">No</th>
                            <th className="py-5">Nama</th>
                            <th className="py-5">Nomor Telepon</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataPelanggan.map((pelanggan, index) => (
                            <tr key={index} className="border-b-2 border-gray-400">
                                <td className="py-3 whitespace-normal">{index + 1}</td>
                                <td className="py-3 whitespace-normal w-1/3">{pelanggan.namapelanggan}</td>
                                <td className="py-3 whitespace-normal">{pelanggan.nomortelp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Pelanggan;