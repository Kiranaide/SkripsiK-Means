import db from './db';

export default async (req, res) => {
  const { id_produk } = req.query;
  
  try {
    const query = 'SELECT * FROM produk WHERE id_produk=?';
    const results = await new Promise((resolve, reject) => {
      db.query(query, [id_produk], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};