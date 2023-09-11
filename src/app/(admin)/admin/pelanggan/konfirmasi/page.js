'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image';

const Konfirmasi = () => {
    const [dataCart, setCart] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get('/api/getCustPayment');
            setCart(response.data);
        }
        catch (error) {
            console.log('error!', error)
        }
    }

    const confirmData = async (id) => {
        try {
            await axios.post(`/api/acceptPayment?id=${id}`)
            getData();
        } catch (error) {
            console.error(error);
        }
    }

    const deleteData = async (id) => {
        try {
            await axios.post(`/api/deleteBuktiPembayaran?id=${id}`);
            getData();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="my-40">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl">Data Keranjang</h1>
            </div>
            <div className="my-8">
                <table className="w-full text-center table-auto">
                    <thead>
                        <tr className="border-b-2 border-gray-400">
                            <th className="py-5">No</th>
                            <th className="py-5">Nama Pelanggan</th>
                            <th className="py-5">Alamat</th>
                            <th className="py-5">Nomor Telepon</th>
                            <th className="py-5">Produk</th>
                            <th className="py-5">Jumlah Produk</th>
                            <th className="py-5">Total Harga</th>
                            <th className="py-5">Status</th>
                            <th className="py-5">Bukti Pembayaran</th>
                            <th className="py-5">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCart.map((cart, index) => (
                            <tr key={index} className="border-b-2 border-gray-400">
                                <td className="py-3 whitespace-normal">{index + 1}</td>
                                <td className="py-3 whitespace-normal">{cart.nama}</td>
                                <td className="py-3 whitespace-normal">{cart.alamat}</td>
                                <td className="py-3 whitespace-normal">{cart.nomortelp}</td>
                                <td className="py-3 whitespace-normal">{cart.produk}</td>
                                <td className="py-3 whitespace-normal">{cart.quantity}</td>
                                <td className="py-3 whitespace-normal">Rp.{cart.totalbayar}</td>
                                <td className="py-3 whitespace-normal">{cart.status}</td>
                                <td className="py-3 whitespace-normal"> <Image src={`/img/buktipembayaran/${cart.buktipembayaran}`} width={100} height={100} alt="Produk" className="rounded-3xl" /></td>
                                <td className="py-3 w-1/6">
                                {cart.status.toLowerCase() === "sudah di cek" && (
                                    <button className="bg-red-500 rounded-2xl h-12 text-white px-4 py-2 mx-2" onClick={() => deleteData(cart.id)}>
                                        Hapus Pembelian
                                    </button>
                                )}
                                {cart.status.toLowerCase() !== "sudah di cek" && (
                                    <button className="bg-web-black rounded-2xl h-12 text-white px-4 py-2 mx-2" onClick={() => confirmData(cart.id)}>
                                        Konfirmasi Pembelian
                                    </button>
                                )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Konfirmasi;