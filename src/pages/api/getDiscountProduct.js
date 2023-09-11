import db from './db';

export default async (req, res) => {
  if (req.method === 'GET') {
    const query = `
    SELECT p.id_produk, p.produk, p.harga, SUM(dp.potongan)
    AS totaldiskon FROM produk p JOIN diskon_produk dp  
    ON p.id_produk = dp.id_diskon GROUP BY p.id_produk, p.produk, p.harga `;
    
    db.query(query, (error, results) => {
      if (error) throw error;
      res.status(200).json(results);
    });
  }
};
