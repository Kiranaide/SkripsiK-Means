import db from './db';

function euclideanDistance(pointA, pointB) {
  const squaredDistance = Math.pow(pointA[0] - pointB[0], 2) + Math.pow(pointA[1] - pointB[1], 2);
  console.log('distance', squaredDistance)
  return Math.sqrt(squaredDistance);
}

function calculateNewCentroid(points) {
  const centroid = [0, 0]; // Pusat kluster tetap ada dua koordinat (x, y)
  const numPoints = points.length;

  for (let p = 0; p < numPoints; p++) {
    centroid[0] += points[p][0];
    centroid[1] += points[p][1];
  }

  centroid[0] /= numPoints;
  centroid[1] /= numPoints;

  return centroid;
}

export default async function handler(req, res) {

  if (req.method === 'GET') {
    // Ambil data dari database dengan query yang baru
    const query = `
      SELECT penjualan_produk.total, produk.produk, produk.stok, produk.harga, produk.id_produk, produk.images, produk.kategori
      FROM penjualan_produk
      JOIN produk ON penjualan_produk.id_produk = produk.id_produk
    `;

    db.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving data:', error);
       
      } else {
        let labeledClusters;
        let minTotal = Infinity;
        let maxTotal = -Infinity;
        let minStok = Infinity;
        let maxStok = -Infinity;
        const data = results.map(row => [row.stok, row.total]);
        for (let i = 0; i < results.length; i++) {
          const row = results[i];
          if (row.total < minTotal) {
            minTotal = row.total;
          }
          if (row.total > maxTotal) {
            maxTotal = row.total;
          }
          if (row.stok < minStok) {
            minStok = row.stok;
          }
          if (row.stok > maxStok) {
            maxStok = row.stok;
          }
        }

        const normalizedData = results.map(row => [
          (row.total - minTotal) / (maxTotal - minTotal),
          (row.stok - minStok) / (maxStok - minStok)
        ]);


        console.log('normalisasidata',normalizedData)
        const numClusters = 2;
        let centroids = normalizedData.slice(0, numClusters);


        const maxIterations = 8;
        const threshold = 0.1; 


        let previousCentroids = centroids.map(c => [...c]);
        let converged = false;
        
        for (let iteration = 0; iteration < maxIterations && !converged; iteration++) {
          const clusters = Array.from({ length: numClusters }, () => []);
        
          for (let i = 0; i < normalizedData.length; i++) {
            const point = normalizedData[i];
            let minDistance = Infinity;
            let closestCluster = 0;
        
            for (let clusterIdx = 0; clusterIdx < numClusters; clusterIdx++) {
              const distance = euclideanDistance(point, centroids[clusterIdx]);
              if (distance < minDistance) {
                minDistance = distance;
                closestCluster = clusterIdx;
              }
            }
            clusters[closestCluster].push({ ...results[i], point }); // Ganti results[i] dengan row
          }
          previousCentroids = centroids.map(c => [...c]);
          centroids = clusters.map(cluster => calculateNewCentroid(cluster.map(dataPoint => dataPoint.point)));
          let allCentroidsConverged = true;
          for (let clusterIdx = 0; clusterIdx < numClusters; clusterIdx++) {
            const distance = euclideanDistance(centroids[clusterIdx], previousCentroids[clusterIdx]);
            if (distance > threshold) {
              allCentroidsConverged = false;
              break;
            }
          }
        
          if (allCentroidsConverged) {
            converged = true;
          }

          const popularityTreshold = 0.5;

          centroids = clusters.map(cluster => calculateNewCentroid(cluster.map(dataPoint => dataPoint.point)));
          labeledClusters = clusters.map((cluster, index) => ({
            label: index,
            products: cluster.map(product => ({
              id_produk: product.id_produk,
              total: product.total,
              produk: product.produk,
              kategori: product.kategori,
              stok: product.stok,
              harga: product.harga,
              images: product.images,
              label: product.point[0] > popularityTreshold ? 'Laris' : 'Tidak Laris'
            })),
            centroids
          }));
          
        }
        res.status(200).json({ labeledClusters });
      }
      
    });
  }
}