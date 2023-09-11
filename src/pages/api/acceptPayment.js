'use client'
import db from './db';

export default async (req, res) => {
    const {id} = req.query;
  if (req.method === 'POST') {
    const query = 'UPDATE cart_pelanggan SET status=? WHERE id=?';
    const value = ["Sudah Di Cek", id];
    db.query(query, value, (error, results) => {
      if (error) throw error;
      res.status(200).json(results);
    });
  }
};
