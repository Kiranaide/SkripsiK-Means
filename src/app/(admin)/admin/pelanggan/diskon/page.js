'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

const Diskon = () => {
  const [dataDiskon, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`/api/getCustData`);
      setData(response.data);
      console.log('response', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDiscount = async (id_users) => {
    try {
        const response = await axios.post('/api/deleteCustDiscount', {
            id_users: id_users
        });
        window.location.reload();
    } catch (error) {
        console.error(error);
    }
}

  return (
    <div className="my-40">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-4">Discount</h1>
        <button onClick={getData}>Refresh</button>
      </div>
      <table className="w-full text-center table-auto">
        <thead>
          <tr>
            <th className="py-3 px-4">ID Pelanggan</th>
            <th className="py-3 px-4">Nama Pelanggan</th>
            <th className="py-3 px-4">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dataDiskon.map((diskon) => (
            <tr key={diskon.id_users}>
              <td>{diskon.id_users}</td>
              <td>{diskon.namapelanggan}</td>
              <td className="py-3 px-4">
                <button onClick={() => deleteDiscount(diskon.id_users)} className="button is-small is-danger">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Diskon;
