'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

const KMeansProduk = () => {
    const [clusters, setClusters] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get('/api/kmeansProduct');
            setClusters(response.data.labeledClusters);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        fetchData();
    }, []);
    const addDiscount = async (id_produk) => {
      try{
        const requestData = {
          id_produk
        }
          await axios.post(`/api/addProductDiscount/`, requestData);    
      }
      catch (error) {
          console.error(error);
      }
  }
    return (
<div className="mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Cluster Data Produk</h1>
      <div className="grid grid-cols-2 gap-4">
        {clusters.map(cluster => (
          <div key={cluster.label} className="border p-4">
            <h2 className="text-xl font-semibold mb-2">Cluster {cluster.label} - {cluster.products[0]?.label}</h2>
            {cluster.products.map(produk => (
              <div key={produk.produk} className="mb-2">
                <p>{produk.produk}</p>
                <p>Stok: {produk.stok}</p>
                <p>Total: {produk.total}</p>
                <button onClick={() => addDiscount(produk.id_produk)} className="button is-small is-danger">Masukan Ke Diskon</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    );
};

export default KMeansProduk;