import db from './db';

export default async (req, res) => {
  const { id_users } = req.query;
    console.log('id_users', id_users)
  
  try {
    const query = `select waiting_cart.id_users, produk.*
    from waiting_cart
    JOIN user on waiting_cart.id_users = user.id_users
    JOIN produk on waiting_cart.id_produk = produk.id_produk
    WHERE waiting_cart.id_users = ?`;
    const results = await new Promise((resolve, reject) => {
      db.query(query, [id_users], (error, results) => {
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