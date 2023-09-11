import sharp from 'sharp';
import db from './db'; 

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { nama, harga, stok, desk, picture } = req.body;
      const pictureBuffer = Buffer.from(picture, 'base64');
      const pictureWithExtension = `${Date.now()}.jpg`; 
      await sharp(pictureBuffer).jpeg().toFile(`./public/img/produk/${pictureWithExtension}`);
      const insertQuery = 'INSERT INTO produk (produk, harga, stok, deskripsi, images) VALUES (?, ?, ?, ?, ?)';
      const values = [nama, harga, stok, desk, pictureWithExtension];
      db.query(insertQuery, values, (error, results) => {
        if (error) {
          console.log('Error inserting data:', error);
          return res.status(500).json({ error: 'Failed to insert data.' });
        }
        const insertPenjualanQuery = 'INSERT INTO penjualan_produk (produk) VALUES (?)';
        const values2 = [nama];
        db.query(insertPenjualanQuery, values2, (penjualanError, penjualanResults) => {
          if (penjualanError) {
            console.log('Error inserting penjualan data:', penjualanError);
            return res.status(500).json({ error: 'Failed to insert penjualan data.' });
          }
          return res.status(200).json({ message: 'Data added successfully.' });
        });
      });
    } catch (error) {
      console.log('Error:', error);
      return res.status(500).json({ error: 'An error occurred.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
};
