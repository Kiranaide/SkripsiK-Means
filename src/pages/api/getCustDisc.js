import db from './db';
export default async (req, res) => {
  const {id} = req.query;
  console.log('asd', id)
  const query = `SELECT u.id_users, u.namapelanggan
  from diskon_pelanggan dp
  JOIN user u ON u.id_users = dp.id_diskon WHERE dp.id_diskon = (?)
  `;
  db.query(query, [id], (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating data');
    } else {
      return res.json(data);
    }
  });
};
