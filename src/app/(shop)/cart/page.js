'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import Link from 'next/link';

const LoginModal = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="font-bold text-2xl mb-4">Please log in to continue</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [productWait, setProductWaiting] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [picture, setPicture] = useState(null);
  const [discountProducts, setDiscountProducts] = useState([]);
  const [namapembeli, setNamaPembeli] = useState('');
  const [alamat, setAlamat] = useState('');
  const [buktipembayaran, setBukti] = useState(null);
  const [nomortelp, setNomorTelp] = useState('');
  const [idproduct, setIdProduct] = useState([]);

  useEffect(() => {
    ambilWaitingData();
    calculateDiscountedPrice();
  }, [])

  const ambilWaitingData = async () => {
    try {
      const token = Cookies.get('token');
      const decodedToken = jwt_decode(token)
      const { id } = decodedToken;
      const response = await axios.get(`/api/fetchCart/?id_users=${id}`);
      console.log('asd', response)
      const productWaiting = response.data.map((product) => ({
        ...product
      }));
      setProductWaiting(productWaiting);
      const customerDiscountResponse = await axios.get(`/api/getCustDisc/?id=${id}`);
      if (customerDiscountResponse.data.length > 0) {
        const discountResponse = await axios.get(`/api/getDiscountProduct`);
        setDiscountProducts(discountResponse.data);
        console.log('discount data', discountResponse);
      }
    } catch (error) {
      console.log('a',error);
    }
  }
  const calculateTotal = () => {
    let total = 0;
  
    productWait.forEach((product) => {
      const harga = parseFloat(product.harga);
  
      if (discountProducts && discountProducts.length > 0) {
        const discountProduct = discountProducts.find((discount) => discount.id_produk === product.id_produk);
  
        if (discountProduct) {
          const discountedPrice = calculateDiscountedPrice(harga, discountProduct.totaldiskon);
          total += quantity * discountedPrice; // Use the discounted price here
        } else {
          total += quantity * harga;
        }
      } else {
        total += quantity * harga;
      }
    });
  
    return total;
  };
  

  const hapusData = async (id_produk) => {
    try {
      const token = Cookies.get('token');
      const decodedToken = jwt_decode(token)
      const { id } = decodedToken;
      const id_users = id;
      await axios.get(`/api/removeWaitingCart/?id_users=${id_users}&id_produk=${id_produk}`);
      ambilWaitingData();
    } catch (error) {
      console.error(error);
    }
  }
  const kirimData = async (e) => {
    e.preventDefault();
    const ongkir = 20000;
    const totalbayar = calculateTotal() + ongkir;
    let listProduk;
    let namapem = namapembeli;
    let subtotal = calculateSubtotal();
    try {
      const token = Cookies.get('token');
      const decodedToken = jwt_decode(token);
      const { id } = decodedToken
      const response = await axios.get(`/api/fetchCart/?id_users=${id}`);
      const productWaiting = response.data.map((product) => ({
        ...product
      }));
      setProductWaiting(productWaiting);
      listProduk = response.data.map((product) => product.produk).join(', ');

    } catch (error) {
      console.log('asdasd', error)
    } try {
      const token = Cookies.get('token');
      const decodedToken = jwt_decode(token);
      const { id } = decodedToken
      const reader = new FileReader();
      const response = await axios.get(`/api/fetchCart/?id_users=${id}`);
      const idproductres = response.data.map((product) => product.id_produk)
      setIdProduct(idproductres);
      const tot = calculateSubtotal();
      reader.onload = async () => {
        const base64Picture = reader.result.split(',')[1];
        const imagePembayaran = {
          id,
          namapem,
          alamat,
          nomortelp,
          listProduk,
          quantity,
          totalbayar: subtotal,
          buktipembayaran: base64Picture,
          idproductres,
        }
        await axios.post(`/api/cartAccept`, imagePembayaran);
      }
      reader.readAsDataURL(buktipembayaran);
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCloseModal = () => {
        setShowSuccessModal(false); 
    };

  const calculateDiscountedPrice = (price, totaldiskon) => {
    const discountedPrice = price - (price * totaldiskon / 100);
    const parsedDiscount = parseInt(discountedPrice)
    console.log('abc', parsedDiscount)
    return parsedDiscount;
  };
  const calculateSubtotal = () => {
    let total = 0;
    const ongkir = 20000;
    productWait.forEach((product) => {
      const harga = parseFloat(product.harga);
      // Assuming each product has a quantity property

      if (discountProducts && discountProducts.length > 0) {
        const discountProduct = discountProducts.find((discount) => discount.id_produk === product.id_produk);

        if (discountProduct) {
          const discountedPrice = calculateDiscountedPrice(harga, discountProduct.totaldiskon);
          console.log('discountedlog', discountedPrice)
          total += quantity * discountedPrice;
        } else {
          total += quantity * harga;
        }
      } else {
        total += quantity * harga;
      }
    });

    return total;
  };
  const ongkir = 20000;
  const totalbayar = calculateTotal() + ongkir;
  return (
    <div>
    {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
          <div className="bg-white p-8 rounded-md shadow-md">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-web-black">Purchasing Successful!</h2>
              <p className="text-xl font-normal text-web-black">Pembelian anda telah berhasil!</p>
            </div>
            <Link href="/" className="mt-4 bg-web-black text-white rounded-md px-8 py-4" onClick={handleCloseModal}>
              Close
            </Link>
          </div>
        </div>
      )}
    <div className="my-40 flex flex-row">
      <div className="flex justify-center gap-8 w-full">
        <div className="w-1/3 bg-web-white rounded-3xl">
          <div className="flex flex-col gap-4 p-6">
            <h1 className="font-bold text-4xl text-web-black flex justify-start">Cart</h1>
            <hr />
            {productWait.map((product) => (
              <div key={product.id_produk} className="flex flex-row gap-8 items-center justify-between w-full">
                <Image src={`/img/produk/${product.images}`} width={100} height={100} alt="Produk" className="rounded-3xl" />
                <div className="flex flex-col">
                  <h1 className="font-bold text-2xl text-web-black">{product.produk}</h1>
                  {discountProducts && discountProducts.length > 0 ? (
                    <>
                      {discountProducts.find((discountProduct) => discountProduct.id_produk === product.id_produk) ? (
                        <>
                          <p className="font-normal text-xl text-web-black line-through">Rp.{product.harga}</p>
                          {discountProducts.map((discountProduct) => {
                            if (discountProduct.id_produk === product.id_produk) {
                              const discountedPrice = calculateDiscountedPrice(product.harga, discountProduct.totaldiskon);
                              return  <p key={discountProduct.id} className="font-normal text-xl text-web-black">Rp.{discountedPrice}</p>
                            }
                            return null;
                          })}
                        </>
                      ) : (
                        <p key={product.id_produk} className="text-sm text-web-black">Rp.{product.harga}</p>
                      )}
                    </>
                  ) : (
                    <p key={product.id_produk} className="text-sm text-web-black">Rp.{product.harga}</p>
                  )}
                </div>
                <button
                  className="rounded-2xl bg-web-black h-12 px-4 py-4 flex items-center"
                  onClick={() => hapusData(product.id_produk)}
                >
                  Remove
                </button>
              </div>
            ))}
            <hr />

            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <h1 className="font-bold text-2xl text-web-black">Total</h1>
                <p className="font-normal text-xl text-web-black"> Rp. {calculateTotal()}</p>
              </div>
              <div className="flex flex-row justify-between">
                <h1 className="font-bold text-2xl text-web-black">Ongkir</h1>
                <p className="font-normal text-xl text-web-black">Rp. {ongkir}</p>
              </div>
              <div className="flex flex-row justify-between">
                <h1 className="font-bold text-2xl text-web-black">Total Bayar</h1>
                <p className="font-normal text-xl text-web-black">Rp. {calculateSubtotal() + ongkir}</p>
              </div>
            </div>

          </div>
        </div>
        <div className="w-2/3 bg-web-white rounded-3xl">
          <form onSubmit={kirimData}>
            <div className="flex flex-col gap-4 p-6">
              <h1 className="font-bold text-4xl text-web-black flex justify-start">Detail Pengantaran</h1>
              <hr />
              <div className="flex flex-col gap-3">
                <label className="font-bold text-2xl text-web-black">Nama Penerima</label>
                <input className="rounded-2xl bg-web-black h-12 w-1/2 p-4" value={namapembeli} onChange={(event) => setNamaPembeli(event.target.value)} />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold text-2xl text-web-black">Alamat</label>
                <input className="rounded-2xl bg-web-black h-12 w-1/2 p-4" value={alamat} onChange={(event) => setAlamat(event.target.value)} />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold text-2xl text-web-black">No. Telepon</label>
                <input className="rounded-2xl bg-web-black h-12 w-1/2 p-4" value={nomortelp} onChange={(event) => setNomorTelp(event.target.value)} />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold text-2xl text-web-black">Bukti Pembayaran</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                    </svg>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <input id="gambar" name="gambar" type="file" onChange={(event) => setBukti(event.target.files[0])} />
                    </div>
                    <p classNane="text-xs leading-5 text  -gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
              <div>
                <button className="rounded-2xl bg-web-black h-12 w-1/2 p-4 ">Checkout</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showModal && <LoginModal key="loginModal" onClose={() => setShowModal(false)} />}
    </div>
    </div>
  );
};

export default Cart;
