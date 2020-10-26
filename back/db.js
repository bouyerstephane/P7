const sql = require('mysql');

const db = {
    mysql_pool :
    sql.createPool({
        host: 'localhost',
        port: 3306,
        user: 'client',
        password: 'vcmpvcmp',
        database: 'P7'
    })
}
// db.connect((error) => {
//     if (error) throw error;
//     console.log("DB Connected !");
// });

module.exports = db;
