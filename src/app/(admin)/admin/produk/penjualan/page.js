'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
const Penjualan = () => {
    const [penjualan, setPenjualan ] = useState([]);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get('/api/penjualan');
            setPenjualan(response.data);
        }
        catch (error) {
            console.log('error!', error)
        }

    }
    
    return (
        <div className="my-32">
            <div className="flex items-center justify-center my-16">
                <h1 className="font-bold text-6xl">Penjualan</h1>
            </div>
            <table className="w-full text-center">
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>PRODUK</th>
                        <th>JANUARI</th>
                        <th>FEBRUARI</th>
                        <th>MARET</th>
                        <th>APRIL</th>
                        <th>MEI</th>
                        <th>JUNI</th>
                        <th>JULI</th>
                        <th>AGUSTUS</th>
                        <th>SEPTEMBER</th>
                        <th>OKTOBER</th>
                        <th>NOVEMBER</th>
                        <th>DESEMBER</th>
                    </tr>
                </thead>
               {penjualan.map((product, index) => (
                            <tr key={index} className="border-b-2 border-gray-400">
                                <td className="py-5">{index + 1}</td>
                                <td className="py-5">{product.produk}</td>
                                <td className="py-5">{product.JAN}</td>
                                <td className="py-5">{product.FEB}</td>
                                <td className="py-5">{product.MAR}</td>
                                <td className="py-5">{product.APR}</td>
                                <td className="py-5">{product.MAY}</td>
                                <td className="py-5">{product.JUN}</td>
                                <td className="py-5">{product.JUL}</td>
                                <td className="py-5">{product.AUG}</td>
                                <td className="py-5">{product.SEP}</td>
                                <td className="py-5">{product.OCT}</td>
                                <td className="py-5">{product.NOV}</td>
                                <td className="py-5">{product.DES}</td>
                            </tr>
                        ))}
            </table>
        </div>
    );
};

export default Penjualan;