import db from './db';

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { id_produk } = req.body;

            const insertQuery = "INSERT INTO `diskon_produk` (id_diskon, potongan) VALUES (?, '0')";
            
            db.query(insertQuery, [id_produk], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: err.sqlMessage });
                }
                
                console.log(result);
                return res.status(200).json({ message: 'Data added successfully.' });
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while processing the request.' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed.' });
    }
};
