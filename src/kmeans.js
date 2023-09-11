import KMeans from 'ml-kmeans';

export function performKMeans(data) {
  const kmeans = new KMeans();
  const clusters = kmeans.cluster(data, { clusters: 2, initialization: 'random' });

  return clusters;
}