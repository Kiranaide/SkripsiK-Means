'use client'
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'aws.connect.psdb.cloud',
    database: 'xxxxxx',
    user: 'xxxxxx',
    password: 'xxxxxx',
    ssl:{},
});

module.exports = connection;
