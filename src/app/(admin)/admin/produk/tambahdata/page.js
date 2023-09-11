'use client'
import React, { useState } from 'react';
import axios from 'axios';

const TambahData = () => {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [stok, setStok] = useState('');
  const [desk, setDesk] = useState('');
  const [picture, setPicture] = useState(null);

  const handlePictureChange = (e) => {
    const selectedPicture = e.target.files[0];
    console.log('Selected Picture:', selectedPicture);
    setPicture(selectedPicture);
    console.log('Selected Picture:', selectedPicture);
  };

  const insert = async (e) => {
    e.preventDefault();
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Picture = reader.result.split(',')[1];
        const requestData = {
          nama,
          harga,
          stok,
          desk,
          picture: base64Picture,
        };
        const response = await axios.post('/api/addData', requestData);
          window.location.href = "/admin/produk/produk";
      };
      if (picture) {
        reader.readAsDataURL(picture);
      }
    } catch (error) {
      console.log('Error inserting data:', error);
    }
  };

  return (
  <div className="my-32 bg-web-black dark:bg-web-white rounded-2xl px-8 py-8 w-[600px] h-auto container">
    <div class="flex flex-col">
        <div className="flex items-center justify-center">
            <h1 class="text-4xl font-bold text-web-black mb-6">Tambah Data.</h1>
        </div>
        <form onSubmit={insert} className='flex flex-col gap-4 text-web-black font-medium'>
          <input type="text" className="px-4 h-14 rounded-xl border-2 placeholder:text-web-black placeholder:opacity-30" placeholder="Nama Produk" id="nama" name="nama" value={nama} onChange={(e) => setNama(e.target.value)} />
          <input type="text" className="px-4 h-14 rounded-xl border-2 placeholder:text-web-black placeholder:opacity-30" placeholder="Harga Produk" id="harga" name="harga" value={harga} onChange={(e) => setHarga(e.target.value)} />
          <input type="text" className="px-4 h-14 rounded-xl border-2 placeholder:text-web-black placeholder:opacity-30" placeholder="Stok yang ada" id="stok" name="stok" value={stok} onChange={(e) => setStok(e.target.value)} />
          <textarea id="desk" className="px-4 py-4 rounded-xl border-2 placeholder:text-web-black resize-none h-[100px] placeholder:opacity-30" placeholder="Deskripsi Produk" name="deskripsi" value={desk} onChange={(e) => setDesk(e.target.value)} />
          <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
              </svg>
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                  <input id="gambar" name="gambar" type="file" onChange={handlePictureChange} />
              </div>
              <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          <button type="submit" className='h-14 rounded-xl bg-web-blue text-web-white font-bold text-xl'>Tambah</button>
        </form>
    </div>
  </div>
  );
};

export default TambahData;
