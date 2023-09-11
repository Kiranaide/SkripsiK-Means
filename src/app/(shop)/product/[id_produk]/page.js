'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";


const LoginModal = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="font-bold text-2xl mb-4 text-web-black">Please log in to continue</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const Product = ({ params }) => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const { id_produk } = params

  useEffect(() => {
    const { id_produk } = params;
    axios
      .get(`/api/fetchProductId?id_produk=${id_produk}`)
      .then((response) => {
        const productupdate = response.data.map((product) => {
          const pictUrl = `/img/produk/${product.images}`;
          return { ...product, pictUrl };
        });
        setProducts(productupdate);
      });
  }, [params]);

  useEffect(() => {
    // Initialize cartProducts from localStorage
    const storedCartProducts = localStorage.getItem('cartProducts');
    if (storedCartProducts) {
      setCartProducts(JSON.parse(storedCartProducts));
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const tambahBelanja = async () => {
    try{
      const token = Cookies.get('token');
      const decodedToken = jwt_decode(token)
      const { id } = decodedToken;
      await axios.post('/api/addWaitingData', {
        id_users: id,
        id_produk: id_produk,
      });
      }
    catch(error){

    }
  }
  const handleBuyClick = () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setShowModal(true);
    } else {
      tambahBelanja();
      window.location.href = "/cart";
    }
  };

  return (
    <div className="my-40 flex flex-row">
      <div className="w-1/2 flex items-center justify-center">
        {products.map((products)=>(
   <><Image src={`/img/produk/${products.images}`} width={500} height={500} alt="Produk" className="rounded-3xl" /></>
        ))}
      </div>
      <div className="w-1/2 flex flex-col gap-6 justify-start">
      {products.map((products)=>(
        <div className="flex flex-col gap-4" key={products}>
          <h2 className="font-bold text-5xl">{products.produk}</h2>
          <h5 className="font-normal text-3xl">Rp.{products.harga}</h5>
          <p className="text-xl font-normal">{products.deskripsi}</p>
        </div>
        ))}
        <div className="flex flex-row gap-4 items-center my-12">
          <button className="px-8 py-4 rounded-3xl bg-web-lightyellow text-web-black font-bold" onClick={handleBuyClick}>
            Beli
          </button>
        </div>
      </div>
      {showModal && <LoginModal onClose={handleCloseModal} />}
    </div>
  );
};



export async function getStaticPaths({ params }) {
  try {
    const { id_produk } = params;
    const response = await axios.get(`/api/fetchProductId?id_produk=${id_produk}`);
    const product = response.data[0]; // Assuming you're fetching a single product
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching product data:', error);
    return {
      notFound: true,
    };
  }
}

export default Product;
