'use client'
import db from './db';

export default async (req, res) => {
  if (req.method === 'GET') {
    const query = 'SELECT * FROM cart_pembayaran';
    
    db.query(query, (error, results) => {
      if (error) throw error;
      res.status(200).json(results);
    });
  }
};
