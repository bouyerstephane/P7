const sql = require('mysql');

const db = sql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'client',
    password: 'vcmpvcmp',
    database: 'P7',
    connectionLimit: 10
})


module.exports = db;
