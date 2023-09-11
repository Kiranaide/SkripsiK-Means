'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [clusters, setClusters] = useState([]);
    const [selectedCluster, setSelectedCluster] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/kmeansProduct');
                if (response.data.labeledClusters.length > 0) {
                    setSelectedCluster(response.data.labeledClusters[0]);
                }
                setClusters(response.data.labeledClusters);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        axios.get('api/fetchCategories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const filteredProduct = selectedCategories ? products.filter(product => product.kategori === selectedCategories) : products;
    
    useEffect(() => {
        axios
            .get('/api/fetchProduct')
            .then((response) => {
                const productupdate = response.data.map((product) => {
                    const pictUrl = `/img/produk/${product.images}`;

                    return { ...product, pictUrl }
                });
                setProducts(productupdate);

            })
    }, [])

    return (
        <div className="">
            <div className="mt-24 mb-12 flex justify-center">
                <h1 className="font-bold text-8xl">Product</h1>
            </div>
            <div className="flex gap-5 items-center justify-center flex-col">
                <h1 className="text-3xl font-semibold mb-4">Rekomendasi Produk dari kami</h1>
                <div className="flex flex-wrap gap-4">
                    {selectedCluster && selectedCluster.products && selectedCluster.products.length > 0 && (
                        <div className="mb-8">
                            <div className="flex items-center justify-center gap-5 ">
                                {selectedCluster.products.map(produk => (
                                    <Link key={produk.id_produk} href={`/product/${produk.id_produk}`} passHref className="flex flex-col items-center justify-center mb-5">
                                        <div className="">
                                            <Image src={`/img/produk/${produk.images}`} width={250} height={250} alt="Produk" className="rounded-3xl mb-5" />
                                            <div className="flex flex-col gap-3 justify-center items-center">
                                                <p className="font-bold text-base capitalize">{produk.produk}</p>
                                                <p className="font-normal text-base">Stok: {produk.stok}</p>
                                                <p className="font-semibold text-xl">Rp. {produk.harga}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex w-full">
                <div className="flex w-1/5 flex-col gap-4">
                    <h1 className="text-3xl font-semibold mb-4 text-center">Kategori</h1>
                    <ul className="flex gap-4 flex-col">
                        <li 
        key="all" 
        className={'text-center text-lg' + (selectedCategories === null ? ' text-blue-500' : '')}
        onClick={() => setSelectedCategories(null)}>
        All
    </li>
    {categories.map((category) => (
        <>
        <li 
            key={category.id_produk} 
            className={'text-center text-lg' + (selectedCategories === category.kategori ? ' text-blue-500' : '')}
            onClick={() => setSelectedCategories(category.kategori)}>
            {category.kategori}
        </li>
        </>
    ))}
</ul>
                </div>
                <div className="flex gap-5 items-center justify-start flex-col w-4/5">
                    <h1 className="text-3xl font-semibold mb-4">Semua Produk</h1>
                    <div className="grid grid-cols-4">
                        {filteredProduct.map((product) => (
                            <Link key={product.id_produk} href={`/product/${product.id_produk}`} passHref>
                                <div className="flex flex-col items-center justify-center mb-5">
                                    <Image src={`/img/produk/${product.images}`} width={200} height={200} alt="Produk" className="rounded-3xl mb-5" />
                                    <div className="flex flex-col gap-3 justify-center items-center">
                                        <p className="font-bold text-base text-center capitalize">{product.produk}</p>
                                        <p className="font-normal text-base">Stok: {product.stok}</p>
                                        <p className="font-semibold text-lg">Rp. {product.harga}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
