const bcrypt = require("bcrypt")
const db = require('../db').mysql_pool;


//création d'un nouvel utilisateur
exports.signup = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const pseudo = req.body.pseudo;
    const email = req.body.email;
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const password = hash;

            db.getConnection((err, connection) => {
                if (err) throw err;
                connection.query("INSERT INTO users SET ?",{firstName: firstName, lastName: lastName, pseudo: pseudo, email: email, password: password}, (err, rows) => {
                    if (err) console.log(err);
                    console.log(rows);
                });
                connection.release();
            })
        })
    res.status(200).json({message: 'success'})
};
