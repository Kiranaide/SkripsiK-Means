import fs from 'fs';
import path from 'path';
import db from './db';

export default async (req, res) => {
  const { id } = req.query;

  if (req.method === 'POST') {
    const selectQuery = 'SELECT buktipembayaran FROM cart_pelanggan WHERE id = ?';
    db.query(selectQuery, [id], (selectError, selectResults) => {
      if (selectError) {
        console.error(selectError);
        return res.status(500).json({ error: selectError.message });
      }

      const filePath = path.join('.public\img\buktipembayaran', selectResults[0].buktipembayaran);

      // Delete the file from the server
      fs.unlink(filePath, (unlinkError) => {
        if (unlinkError) {
          console.error(unlinkError);
        }

        // Delete the record from the database
        const deleteQuery = 'DELETE FROM cart_pelanggan WHERE id = ?';
        db.query(deleteQuery, [id], (deleteError, deleteResults) => {
          if (deleteError) {
            console.error(deleteError);
            return res.status(500).json({ error: deleteError.message });
          }

          res.status(200).json({ message: 'Data deleted successfully.' });
        });
      });
    });
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
};
