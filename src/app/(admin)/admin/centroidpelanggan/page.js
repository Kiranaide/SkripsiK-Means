'use client'
import React, { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js/auto'; // Import yang benar dari chart.js/auto

Chart.register(CategoryScale, LinearScale, PointElement, Tooltip); // Daftarkan skala dan elemen yang diperlukan

const Centroid = () => {
  const [labeledClusters, setLabeledClusters] = useState([]);

  useEffect(() => {
    fetch('/api/kmeansCust') // Ganti dengan endpoint yang sesuai
      .then(response => response.json())
      .then(data => {
        setLabeledClusters(data.labeledClusters);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (labeledClusters.length > 0) {
      const ctx = document.getElementById('scatterChart').getContext('2d');

      const datasets = labeledClusters.map((cluster, index) => ({
        label: `Cluster ${index}`,
        data: cluster.customers.map(customer => ({
          x: customer.total_belanja,
          y: customer.total_pembayaran,
        })),
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
        color: '#ffffff',
        pointRadius: 8,
        pointHoverRadius: 10,
      }));

      console.log(datasets)

      new Chart(ctx, {
        type: 'scatter',
        data: { datasets },
        options: {
            responsive: false,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
            },
            y: {
              type: 'linear',
              position: 'left',
            },
          },
        },
      });
    }
  }, [labeledClusters]);

  return (
    <div className='flex items-center justify-center flex-col'>
      <h2>Centroid Pelanggan</h2>
      <canvas id="scatterChart" width="600" height="600"></canvas>
    </div>
  );
};

export default Centroid;