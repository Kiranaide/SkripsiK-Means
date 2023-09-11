import db from './db';

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { id_users } = req.body;

            const deleteQuery = "DELETE FROM `diskon_pelanggan` WHERE id_diskon = ?";
            
            db.query(deleteQuery, [id_users], (err, result) => {
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
