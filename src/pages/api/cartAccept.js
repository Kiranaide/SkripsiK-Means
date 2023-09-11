import sharp from 'sharp';
import db from './db';

export default async (req, res) => {
    if (req.method === 'POST') {
        const {
            id,
            namapem,
            alamat,
            nomortelp,
            listProduk,
            quantity,
            totalbayar,
            buktipembayaran,
            idproductres
        } = req.body;
        try {
            const pictureBuffer = Buffer.from(buktipembayaran, 'base64');
            const pictureWithExtension = `${Date.now()}.jpg`;
            await sharp(pictureBuffer).jpeg().toFile(`./public/img/buktipembayaran/${pictureWithExtension}`);
            const insertQuery = `
                INSERT INTO cart_pelanggan
                (id_pelanggan, nama, alamat, nomortelp, produk, quantity, totalbayar, status, buktipembayaran)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                id,
                namapem,
                alamat,
                nomortelp,
                listProduk,
                quantity,
                totalbayar,
                "Belum Dikonfirmasi",
                pictureWithExtension
            ];
            console.log('values', values)
            db.query(insertQuery, values, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('err', result)
                }
            });
            const updatePembayaran = `UPDATE pembelian_pelanggan SET total_pembayaran = total_pembayaran + ${totalbayar} WHERE id = ${id} `
            db.query(updatePembayaran, (updateError, updateResult) => {
                if (updateError) {
                    console.log('error', updateError)
                    console.error('Error updating total payment:', updateError);
                }
                else {
                    console.log('Updated total payment:', updateResult);
                }
            });
        } catch (error) {
            console.log('error', error)
            return res.status(500).json({ error: 'An error occurred while converting the image to JPEG.' });
        }
        const deleteData = "DELETE FROM waiting_cart WHERE id_users = ?";
        const valueDelete = [id];
        db.query(deleteData, valueDelete, (deleteError, deleteResult) => {
            if (deleteError) {
                console.error("Error deleting row:", deleteError);
            } else {
                console.log("Deleted row:", deleteResult);
            }
        });
        const ids = idproductres.map((id) => id);
        const placeholders = idproductres.map(() => '?').join(', ');
        console.log('place', placeholders)
        const stokUpdate = `UPDATE produk SET stok = stok - ${quantity} WHERE id_produk IN (${placeholders})`
        db.query(stokUpdate, ids, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                const currentDate = new Date();
                const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DES'];
                const currentMonth = months[currentDate.getMonth()];
                const querypenjualan = `UPDATE penjualan_produk SET ${currentMonth} = ${currentMonth} + ${quantity}, total = total + ${quantity} WHERE id_produk IN (${placeholders})`;
                db.query(querypenjualan, ids, (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        const currentDate = new Date();
                        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DES'];
                        const currentMonth = months[currentDate.getMonth()];
                        const querycustomer = `UPDATE pembelian_pelanggan SET ${currentMonth} = ${currentMonth} + ${quantity}, total_belanja = total_belanja + ${quantity} WHERE id = ${id}`;
                        db.query(querycustomer, (err, result) => {
                            if (err) {
                                console.error(err);
                                console.log('error!', err);
                            } else {
                                res.status(200).send('Data updated successfully');
                            }
                        })
                    }
                })
            }

        })
    }
}