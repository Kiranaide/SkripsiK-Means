import db from './db';
function euclideanDistance(pointA, pointB) {
  const squaredDistance = Math.pow(pointA[0] - pointB[0], 2) + Math.pow(pointA[1] - pointB[1], 2);
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
  const query = 'SELECT id, nama, total_belanja, total_pembayaran FROM pembelian_pelanggan';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving data:', error);
    } else {
      const data = results.map(row => [row.total_belanja, row.total_pembayaran]);
      const numClusters = 2;
      let centroids = data.slice(0, numClusters);
      console.log('centroids', centroids)
      const maxIterations = 10;
      for (let iteration = 0; iteration < maxIterations; iteration++) {
        const clusters = Array.from({ length: numClusters }, () => []);
        for (let i = 0; i < data.length; i++) {
          const point = data[i];
          let minDistance = Infinity;
          let closestCluster = 0;

          for (let clusterIdx = 0; clusterIdx < numClusters; clusterIdx++) {
            const distance = euclideanDistance(point, centroids[clusterIdx]);
            if (distance < minDistance) {
              minDistance = distance;
              closestCluster = clusterIdx;
            }
          }
          centroids.forEach((centroid, idx) => {
            console.log(`Pusat kluster ${idx + 1}:`, centroid);
          });
            clusters[closestCluster].push({ ...results[i], point }); // Ganti results[i] dengan row
          }
          const loyalityTreshold = 0;
          centroids = clusters.map(cluster => calculateNewCentroid(cluster.map(dataPoint => dataPoint.point)));
          const labeledClusters = clusters.map((cluster, index) => ({
            label: index, // Label kelompok
            customers: cluster.map(customer => ({
              id: customer.id,
              nama: customer.nama,
              total_belanja: customer.total_belanja,
              total_pembayaran: customer.total_pembayaran,
            })),
            centroids
          }));
         return res.json({ labeledClusters });
        }
      }
    });
}