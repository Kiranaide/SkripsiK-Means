import db from './db';

export default (req, res) => {
    if (req.method === 'DELETE') {
        const id_produk = req.query.id_produk;
        const deleteQuery = "DELETE FROM `produk` WHERE id_produk = ?";
        const values = [id_produk];
        db.query(deleteQuery, values, (err, result) => {
            if (err) {
                console.error("Error deleting product:", err);
                return res.status(500).json({ error: err.sqlMessage });
            }
            const deleteQuery2 = "DELETE FROM `penjualan_produk` WHERE id_produk = ?";
            db.query(deleteQuery2, values, (err2, result2) => {
                if (err2) {
                    console.error("Error deleting associated data:", err2);
                    return res.status(500).json({ error: err2.sqlMessage });
                }
                console.log('Product and associated data deleted successfully');
                return res.status(200).json({ message: 'Product and associated data deleted successfully' });
            });
        });
    } else {
        res.status(405).end(); 
    }
};
