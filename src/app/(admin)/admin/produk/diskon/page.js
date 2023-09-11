'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
const Diskon = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        try {
            const response = await axios.get(`/api/getDiscountProduct`);
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateDiscount = async (id_produk, totaldiskon) => {
        try {
          const response = await axios.post('/api/updateDiscount', {
            id_produk: id_produk,
            totaldiskon: totaldiskon,
          });
        } catch (error) {
          console.error(error);
        }
      };

    const deleteDiscount = async (id_produk) => {
        try {
            const response = await axios.post('/api/deleteProductDiscount', {
                id_produk: id_produk
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    const handleDiscountChange = async (id_produk, newTotalDiskon) => {
        const updatedProduct = products.map((product) => 
            product.id_produk === id_produk
            ? { ...product, totaldiskon: newTotalDiskon }
            : product
        );
        setProducts(updatedProduct);
        updateDiscount(id_produk, newTotalDiskon);
    };

    // const handleFormSubmit = (event, id_produk, totaldiskon) => {
    //     event.preventDefault();
    //     updateDiscount(id_produk, totaldiskon);
    //     getProducts();
    // };

    const calculatePriceWithDiscount = (price, discount) => {
        const discountedPrice = price - (price * discount / 100);
        return discountedPrice.toFixed(2);
    };
    return (
    <div className="my-40">
        <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold mb-4">Discount</h1>
            <button onClick={getProducts}>Refresh</button>
        </div>
        <form className="mb-8">
            <table className="w-full text-center table-auto">
                <thead>
                    <tr className="">
                        <th className="py-3 px-4">Produk</th>
                        <th className="py-3 px-4">Harga Produk</th>
                        <th className="py-3 px-4">Diskon</th>
                        <th className="py-3 px-4">Total Harga</th>
                        <th className="py-3 px-4">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id_produk} className="border-b">
                            <td className="py-3 px-4">{product.produk}</td>
                            <td className="py-3 px-4">Rp.{product.harga}</td>
                            <td className="py-3 px-4">
                                <input
                                    type="text"
                                    value={product.totaldiskon}
                                    onChange={(event) => handleDiscountChange(product.id_produk, event.target.value)}
                                    className="w-20 px-3 py-2 rounded border placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 text-web-black"
                                />
                            </td>
                            <td className="py-3 px-4">Rp.{calculatePriceWithDiscount(product.harga, product.totaldiskon)}</td>
                            <td className="py-3 px-4">
                                <button onClick={() => deleteDiscount(product.id_produk)} className="button is-small is-danger">Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </form>
    </div>    
    );
};

export default Diskon;