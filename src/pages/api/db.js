'use client'
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'aws.connect.psdb.cloud',
    database: 'skripsiflash',
    user: '1wuxw3ty5uv1m0cvuv4b',
    password: 'pscale_pw_cyr7kKqr41k2ZY1A1mlky40JX0cmlrMtIXufsRIa9if',
    ssl:{},
});

module.exports = connection;
