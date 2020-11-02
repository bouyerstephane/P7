const bcrypt = require('bcrypt')
const db = require('../db');
const jwt = require('jsonwebtoken');


const passwordValidator = require('password-validator');
const schema = new passwordValidator();
schema
    .is().min(4)         //min 4 caractères
    .is().max(20)      //max 20 caractères
    //.has().digits(1)   // min 1 chiffre
    .has().not().spaces()   // ne doit pas contenir d'espace
//.has().symbols(1)    // min 1 caractère spécial

//création d'un nouvel utilisateur
exports.signup = (req, res) => {
    const {firstName, lastName, pseudo, email} = req.body;
    // vérification et encryptage du mot de passe
    if (schema.validate(req.body.password)) {
        bcrypt.hash(req.body.password, 10)
            .then(password => {
                db.getConnection((error, connection) => {
                    if (error) {
                        res.status(500).json({error})
                    } else {
                        // insertion du nouvel utilisateur
                        connection.query('INSERT INTO users SET ?', {
                            firstName,
                            lastName,
                            pseudo,
                            email,
                            password
                        }, (error) => {
                            if (error) {
                                res.status(400).json({'error': error.sqlMessage})
                            } else {
                                res.status(201).json({'message': 'compte crée !'})
                            }
                        })
                    }
                    connection.release();
                })
            })
    } else {
        res.status(400).json({"error": "veuillez rentrer un mot de passe valide"})
    }
};

exports.login = (req, res) => {
    const {pseudo, password} = req.body;
    db.getConnection((error, connection) => {
        if (error) {
            res.status(500).json({error})
        } else {
            // récuperation de l'utilisateur
            connection.query('SELECT * from users WHERE pseudo = ?', [pseudo], (error, rows) => {
                    if (error) {
                        res.status(400).json({error})
                    } else if (!rows[0]) {
                        res.status(404).json({'error': 'utilisateur non trouvé'})
                    } else {
                        // vérification du mot de passe encrypté
                        bcrypt.compare(password, rows[0].password)
                            .then(valid => {
                                if (!valid) {
                                    res.status(401).json({'error': 'Mot de passe incorrect !'});
                                } else {
                                    res.status(200).json({
                                        // retourne l'id utilisateur, et un token encodé

                                        user: {
                                            userId: rows[0].userId,
                                            isAdmin: rows[0].isAdmin
                                        },
                                        token: jwt.sign(
                                            {userId: rows[0].userId},
                                            'Token_secret',
                                            {expiresIn: '6h'}
                                        )
                                    })
                                }
                            })
                    }
                }
            )
        }
        connection.release()
    })
}

// suppression d'un compte
exports.destroy = (req, res) => {
    console.log(req.body)
    const {userId, password} = req.body;
    db.getConnection((error, connection) => {
        if (error) {
            res.status(500).json({error})
        } else {
            // récuperation de l'utilisateur et vérification du mot de passe
            connection.query('SELECT password from users WHERE userId = ?', [userId], (error, rows) => {
                if (error) {
                    res.status(500).json({error})
                } else if (!rows[0]) {
                    res.status(404).json({'error': 'utilisateur non trouvé'})
                } else {
                    bcrypt.compare(password, rows[0].password)
                        .then(valid => {
                            if (!valid) {
                                res.status(401).json({'error': 'Mot de passe incorrect !'});
                            } else {
                                // destruction du compte
                                connection.query('DELETE FROM users WHERE userId = ?', [userId], (error) => {
                                    if (error) {
                                        res.status(500).json({error});
                                    } else {
                                        res.status(200).json({"message": "compte supprimé"})
                                    }
                                })
                            }
                        })
                }
            })
        }
        connection.release()
    })
}


