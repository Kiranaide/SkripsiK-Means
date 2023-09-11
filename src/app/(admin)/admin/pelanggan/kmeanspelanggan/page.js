'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

const KMeansPelanggan = () => {
    const [clusters, setClusters] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get('/api/kmeansCust');
            setClusters(response.data.labeledClusters);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        fetchData();
    }, []);
    const addDiscount = async (id) => {
      try{
        const requestData = {
          id
        }
          await axios.post(`/api/addUserDiscount/`, requestData);    
      }
      catch (error) {
          console.error(error);
      }
  }
    return (
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-semibold mb-4">Cluster Data Pelanggan</h1>
          <div className="grid grid-cols-2 gap-4">
          {clusters.map(cluster => (
            <div key={cluster.label} className="border p-4 mb-4">
              <h2 className="text-xl font-semibold mb-2">Cluster {cluster.label}</h2>
              {cluster.customers.map(customer => (
                <div key={customer.nama} className="mb-2">
                  <p>{customer.nama}</p>
                  <p>Total Belanja: {customer.total_belanja}</p>
                  <p>Total Pembayaran: Rp.{customer.total_pembayaran}</p>
                  <button onClick={() => addDiscount(customer.id)} className="button is-small is-danger">Masukan Ke Diskon</button>
                </div>
              ))}
            </div>
          ))}
          </div>
        </div>
      );
    }

export default KMeansPelanggan;