import db from './db'; 
export default (req, res) => {
const insert = `INSERT INTO waiting_cart (id_users, id_produk) values (?)`;
const values = [...Object.values(req.body)];
db.query(insert, [values],(err, data) => {
    if (req.method === 'POST') {
    console.log(err, data);
    if (err) return res.json({ error : err.sqlMessage});
    else return res.json({data})
    }
});
}


