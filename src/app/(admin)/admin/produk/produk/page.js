'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
const ProdukPage = () => {
    const [dataproduk, setProduk] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    useEffect(() => {
        getData();
    }, []);


    const getData = async () => {
        try {
            const response = await axios.get('/api/fetchProduct');
            setProduk(response.data);
        }
        catch (error) {
            console.log('error!', error)
        }

    }

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedProduct(null);
        setIsEditModalOpen(false);
    };

    const openDeleteModal = (product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedProduct(null);
        setIsDeleteModalOpen(false);
    };

    const handleEditSubmit = async () => {
        try {
            const response = await axios.post(`/api/updateData/`, {
                produk: selectedProduct.produk,
                deskripsi: selectedProduct.deskripsi,
                harga: selectedProduct.harga,
                stok: selectedProduct.stok,
                id_produk: selectedProduct.id_produk
            });
            console.log('test', response.data);
            const updatedProducts = dataproduk.map(product =>
                product.id_produk === selectedProduct.id_produk ? response.data : product
            );
            setProduk(updatedProducts);
            getData();
            closeEditModal();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleEditChange = (e, attribute) => {
        const updatedProduct = { ...selectedProduct, [attribute]: e.target.value };
        setSelectedProduct(updatedProduct);
    };
    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`/api/deleteProduct?id_produk=${selectedProduct.id_produk}`);
            closeDeleteModal();
            getData();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    

    return (
        <div className="my-40">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl">Data Produk</h1>
                <div className="flex items-center justify-center gap-5">
                    <Link href="/admin/produk/tambahdata" className="flex items-center bg-web-black rounded-2xl h-12 text-white px-4">Tambah Produk</Link>
                </div>
            </div>
            <div className="my-8">
                <table className="w-full text-center table-auto">
                    <thead>
                        <tr className="border-b-2 border-gray-400">
                            <th className="py-5">No</th>
                            <th className="py-5">Nama Produk</th>
                            <th className="py-5">Deskripsi</th>
                            <th className="py-5">Harga</th>
                            <th className="py-5">Stok</th>
                            <th className="py-5">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataproduk.map((product, index) => (
                            <tr key={index} className="border-b-2 border-gray-400">
                                <td className="py-3 whitespace-normal">{index + 1}</td>
                                <td className="py-3 whitespace-normal">{product.produk}</td>
                                <td className="py-3 whitespace-normal max-w-xl overflow-hidden">{product.deskripsi}</td>
                                <td className="py-3 whitespace-normal">Rp.{product.harga}</td>
                                <td className="py-3 whitespace-normal">{product.stok}</td>
                                <td className="py-3 w-1/6">
                                    <button className="bg-web-black rounded-2xl h-12 text-white px-4 py-2 mx-2" onClick={() => openEditModal(product)}>Edit</button>
                                    <button className="bg-red-500 rounded-2xl h-12 text-white px-4 py-2 mx-2" onClick={() => openDeleteModal(product)}>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isEditModalOpen && (
                <div className="bg-web-black bg-opacity-50 fixed top-0 left-0 w-full h-full">
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="flex flex-col bg-web-black dark:bg-web-white rounded-2xl px-6 py-6 w-[400px] h-auto container ">
                            <h2 className="flex items-center justify-center text-3xl font-bold text-web-black mb-4">Edit Produk {selectedProduct.produk}</h2>
                            <form className="flex flex-col gap-4 text-web-black font-medium mb-4">
                                <input type="text" placeholder="Nama Produk" className="px-4 h-14 rounded-xl border-2 placeholder:text-web-black placeholder:opacity-30" value={selectedProduct.produk} onChange={(e) => handleEditChange(e, 'produk')} />
                                <input type="text" placeholder="Deskripsi Produk" className="px-4 h-14 rounded-xl border-2 placeholder:text-web-black placeholder:opacity-30" value={selectedProduct.deskripsi} onChange={(e) => handleEditChange(e, 'deskripsi')} />
                                <input type="number" placeholder="Stok" className="px-4 h-14 rounded-xl border-2 placeholder:text-web-black placeholder:opacity-30" value={selectedProduct.stok} onChange={(e) => handleEditChange(e, 'stok')} />
                                <input type="number" placeholder="Harga" className="px-4 h-14 rounded-xl border-2 placeholder:text-web-black placeholder:opacity-30" value={selectedProduct.harga} onChange={(e) => handleEditChange(e, 'harga')} />
                            </form>
                            <div className="flex flex-row gap-4 justify-between">
                                <button className="w-full h-14 rounded-xl bg-web-white text-web-black border-2 text-xl" onClick={closeEditModal}>Cancel</button>
                                <button className="w-full h-14 rounded-xl bg-web-blue text-web-white text-xl" onClick={handleEditSubmit}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isDeleteModalOpen && (
                <div className="bg-web-black bg-opacity-50 fixed top-0 left-0 w-full h-full">
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="flex flex-col bg-web-black dark:bg-web-white rounded-2xl px-6 py-6 w-[400px] h-auto container">
                            <h2 className="flex items-center justify-center text-3xl font-bold text-web-black mb-6">Apakah Kamu Yakin? Produk {selectedProduct.produk} Akan Dihapus</h2>
                            <div className="flex flex-row gap-4 justify-between">
                                <button className="w-full h-14 rounded-xl bg-web-white text-web-black border-2 text-xl" onClick={closeDeleteModal}>Cancel</button>
                                <button className="w-full h-14 rounded-xl bg-red-500 text-web-white border-2 text-xl" onClick={handleDeleteConfirm}>Confirm Deletion</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProdukPage;