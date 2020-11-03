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
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
        res.status(400).json({"error": "email invalide"})
    } else if (!(/^[a-zA-Z ]+$/.test(firstName)) || !(/^[a-zA-Z ]+$/.test(lastName))) {
        res.status(400).json({"error": "Nom ou prénom invalide"})
    } else {
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
                                    res.status(400).json({'error': "invalid"})
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

exports.getUser = (req, res) => {
    const userId = req.query.userId
    db.getConnection((error, connection) => {
        if (error) {
            res.status(500).json({error})
        } else {
            // récuperation de l'utilisateur
            connection.query('SELECT firstName, lastName, pseudo, email from users WHERE userId = ?', [userId], (error, rows) => {
                if (error) {
                    res.status(500).json({error})
                } else if (!rows[0]) {
                    res.status(404).json({'error': 'utilisateur non trouvé'})
                } else {
                    res.status(200).json({"user": rows[0]})
                }

            })
        }
        connection.release()
    })
}

exports.modifyUser = (req, res) => {
    console.log(req.body)
    const {userId, firstName, lastName, pseudo, email, modifyPassword, password} = req.body
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
        res.status(400).json({"error": "email invalide"})
    } else if (!(/^[a-zA-Z ]+$/.test(firstName)) || !(/^[a-zA-Z ]+$/.test(lastName))) {
        res.status(400).json({"error": "Nom ou prénom invalide"})
    } else {
        if (firstName === "" || lastName === "" || pseudo === "" || email === "") {
            res.status(400).json({"error": "Champs requis vide"})
        } else {
            db.getConnection((error, connection) => {
                if (error) {
                    res.status(500).json({error})
                } else {
                    // récuperation de l'utilisateur
                    connection.query('SELECT * from users WHERE userId = ?', [userId], (error, rows) => {
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
                                        if (modifyPassword) {
                                            if (schema.validate(modifyPassword)) {
                                                bcrypt.hash(modifyPassword, 10)
                                                    .then(passwordHash => {
                                                        connection.query('UPDATE users SET ? WHERE userId = ?', [{
                                                            firstName,
                                                            lastName,
                                                            pseudo,
                                                            email,
                                                            password: passwordHash
                                                        }, userId], (error, rows) => {
                                                            if (error) {
                                                                res.status(400).json(error)
                                                            } else {
                                                                res.status(200).json({"message": "compte modifié"})
                                                            }
                                                        })
                                                    })
                                            } else {
                                                res.status(400).json({"error": "veuillez rentrer un mot de passe valide"})
                                            }
                                        } else {
                                            connection.query('UPDATE users SET ? WHERE userId = ?', [{
                                                firstName,
                                                lastName,
                                                pseudo,
                                                email
                                            }, userId], (error, rows) => {
                                                if (error) {
                                                    res.status(400).json(error)
                                                } else {
                                                    res.status(200).json({"message": "compte modifié"})
                                                }
                                            })
                                        }

                                    }
                                })
                        }
                    })
                }
                connection.release()
            })
        }
    }

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


