const db = require('../db');

// affiche tout les posts
exports.displayAll = (req, res) => {
    const {userId} = req.body;
    db.getConnection((error, connection) => {
        if (error) {
            res.status(500).json({error})
        } else {
            connection.query('SELECT * FROM users WHERE userId = ? ', [userId], (error, rows) => {
                // si l'utilateur existe et qu'il n'y a pas d'erreurs affiche tout les posts
                if (error) {
                    res.status(500).json({"error": error.sqlMessage})
                } else if (!rows[0]) {
                    res.status(404).json({"error": "utilisateur non trouvé"})
                } else {
                    connection.query('SELECT * FROM forum', (error, rows) => {
                        if (error) {
                            res.status(500).json({"error": error.sqlMessage})
                        } else {
                            res.status(200).json({"response": rows})
                        }
                    })
                }
            })
        }
        connection.release()
    })
}

// afficher le post selectionné et les commentaires correspondants
exports.displayOne = (req, res) => {
    const {userId, postId} = req.body
    db.getConnection((error, connection) => {
        if (error) {
            res.status(500).json({error})
        } else {
            // verification de l'utilisateur
            connection.query('SELECT * FROM users WHERE userId = ? ', [userId], (error, rows) => {
                if (error) {
                    res.status(500).json({"error": error.sqlMessage})
                } else if (!rows[0]) {
                    res.status(404).json({"error": 'utilisateur non trouvé'})
                } else {
                    //récuperation du post
                    connection.query('SELECT * FROM forum WHERE postId = ? ', [postId], (error, rows) => {
                        if (error) {
                            res.status(404).json({"error": "post non trouvé"})
                        } else {
                            const post = rows;
                            //récuperation des commentaires correspondants au post
                            connection.query('SELECT * FROM forum_commentary WHERE postId = ?', [postId], (error, rows) => {
                                if (error) {
                                    res.status(404).json({"error": 'post non trouvé'})
                                } else {
                                    res.status(200).json({post, "commentary": rows})
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

// envoyer un nouveau post
exports.submit = (req, res) => {
    const {userId, post} = req.body;
    if (post === "" || !post) {
        res.status(400).json({"error": "veuillez ajouter un post"})
    } else {
        db.getConnection((error, connection) => {
            if (error) {
                res.status(500).json({error})
            } else {
                // verification de l'utilisateur
                connection.query('SELECT * FROM users WHERE userId = ? ', [userId], (error, rows) => {
                    if (error) {
                        res.status(500).json({"error": error.sqlMessage})
                    } else if (!rows[0]) {
                        res.status(404).json({"error": "utilisateur non trouvé"})
                    } else {
                        // ajoute le post avec l'id utilisateur à la bdd avec la date
                        connection.query('INSERT INTO forum  SET ?, date = NOW() ', {
                            userId,
                            post
                        }, (error) => {
                            if (error) {
                                res.status(400).json({error})
                            } else {
                                res.status(200).json({"post": "post ajouté"})
                            }
                        })

                    }
                })
            }
            connection.release()
        })
    }
}

exports.submitComm = (req, res) => {
    const {userId, postId, commentary} = req.body
    if (commentary === "" || !commentary) {
        res.status(400).json({"error": "veuillez ajouter un commentaire"})
    } else {
        db.getConnection((error, connection) => {
            if (error) {
                res.status(500).json({error})
            } else {
                // vérification de l'utilisateur
                connection.query('SELECT * FROM users WHERE userId = ? ', [userId], (error, rows) => {
                    if (error) {
                        res.status(500).json({"error": error.sqlMessage})
                    } else if (!rows[0]) {
                        res.status(404).json({"error": "utilisateur non trouvé"})
                    } else {
                        // vérification du post
                        connection.query('SELECT * FROM forum WHERE postId = ? ', [postId], (error, rows) => {
                            if (error) {
                                res.status(500).json({"error": error.sqlMessage})
                            } else if (!rows[0]) {
                                res.status(404).json({"error": "post non trouvé"})
                            } else {
                                // ajoute le commentaire avec l'id utilisateur et du post avec la date
                                connection.query('INSERT INTO forum_commentary Set ?, date = NOW()', {
                                    userId,
                                    postId,
                                    commentary
                                }, (error) => {
                                    if (error) {
                                        res.status(500).json({"error": error.sqlMessage})
                                    } else {
                                        res.status(200).json({"post": "commentaire envoyé"})
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
}

//modification d'un post ou d'un commentaire
exports.modify = (req, res) => {
    const {userId, postId, commentaryId, post, commentary} = req.body
    if (post && commentary) {
        res.status(400).json({"error": "veuillez ne modifier qu'un seul message à la fois"})
    } else {
        db.getConnection((error, connection) => {
            if (error) {
                res.status(500).json({error})
            } else {
                // vérification de l'utilisateur
                connection.query('SELECT * FROM users WHERE userId = ?', [userId], (error, rows) => {
                    if (error) {
                        res.status(500).json({error})
                    } else if (!rows[0]) {
                        res.status(404).json({"error": "utilisateur non trouvé"})
                    } else {
                        // constante pour ensuite vérifier si l'utilisateur est admin ou non
                        const isAdmin = rows[0].isAdmin
                        if (!commentary || commentary === "") {
                            if (!post || post === "") {
                                res.status(400).json({"error": "modification vide"})
                            } else {
                                // vérification du post et vérifie que l'utilisateur correspond si il n'est pas admin
                                connection.query('SELECT *, post FROM forum WHERE postId = ?', [postId], (error, rows) => {
                                    if (error) {
                                        res.status(500).json({error})
                                    } else if (!rows[0]) {
                                        res.status(404).json({"error": "post non trouvé"})
                                    } else if (userId !== rows[0].userId && isAdmin !== 1) {
                                        res.status(400).json({"error": "l'utilisateur ne correspond pas"})
                                    } else if (post === rows[0].post) {
                                        res.status(400).json({"error": "vous n'avez pas effectué de modification"})
                                    } else {
                                        // modification du post et ajoute la date de modification
                                        connection.query('UPDATE forum  SET ?, lastModif = NOW() WHERE postId = ' + postId + '', {post}, (error) => {
                                            if (error) {
                                                res.status(400).json({"error": error.sqlMessage})
                                            } else {
                                                res.status(200).json({"post": "post modifié"})
                                            }
                                        })
                                    }
                                })
                            }

                        } else {
                            // vérification du commentaire et vérifie que l'utilisateur correspond si il n'est pas admin
                            connection.query('SELECT * FROM forum_commentary WHERE commentaryId = ?', [commentaryId], (error, rows) => {
                                if (error) {
                                    res.status(500).json({error})
                                } else if (!rows[0]) {
                                    res.status(404).json({"error": "commentaire non trouvé"})
                                } else if (userId !== rows[0].userId && isAdmin !== 1) {
                                    res.status(400).json({"error": "l'utilisateur ne correspond pas"})
                                } else if (commentary === rows[0].commentary) {
                                    res.status(400).json({"error": "vous n'avez pas effectué de modification"})
                                } else {
                                    // modification du commentaire et ajoute la date de modification
                                    connection.query('UPDATE forum_commentary  SET ?, lastModif = NOW() WHERE commentaryId = ' + commentaryId + '', {commentary}, (error) => {
                                        if (error) {
                                            res.status(400).json({"error": error.sqlMessage})
                                        } else {
                                            res.status(200).json({"post": "commentaire modifié"})
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            }
            connection.release()
        })
    }
}

// destruction d'un post ou d'un commentaire
exports.destroy = (req, res) => {
    const {userId, postId, commentaryId} = req.body;
    if (postId && commentaryId) {
        res.status(400).json({"error": "vous ne pouvez supprimer qu'un seul message à la fois"})
    } else {
        db.getConnection((error, connection) => {
            if (error) {
                res.status(500).json({error})
            } else {
                // vérification de l'utilisateur
                connection.query('SELECT * FROM users WHERE userId = ? ', [userId], (error, rows) => {
                    if (error) {
                        res.status(500).json({'error': error.sqlMessage})
                    } else if (!rows[0]) {
                        res.status(404).json({'error': 'utilisateur non trouvé'})
                    } else {
                        // constante pour ensuite vérifier si l'utilisateur est admin ou non
                        const isAdmin = rows[0].isAdmin
                        if (postId) {
                            // récuperation du post
                            connection.query('SELECT * FROM forum WHERE postId = ?', [postId], (error, rows) => {
                                if (error) {
                                    res.status(500).json({"error": error.sqlMessage})
                                } else if (!rows[0]) {
                                    res.status(404).json({"error": "post non trouvé"})
                                } else if (userId !== rows[0].userId && isAdmin !== 1) {
                                    res.status(400).json({"error": "l'utilisateur ne correspond pas"})
                                } else {
                                    // destruction du post (et des commentaire correspondant grâce à une clef étrangère
                                    connection.query('DELETE FROM forum WHERE postId = ?', [postId], (error, rows) => {
                                        if (error) {
                                            res.status(500).json({"error": error.sqlMessage})
                                        } else {
                                            res.status(200).json({"message": "poste supprimé"})
                                        }
                                    })
                                }
                            })
                        } else if (commentaryId) {
                            // récupèration du commentaire
                            connection.query('SELECT * FROM forum_commentary WHERE commentaryId = ?', [commentaryId], (error, rows) => {
                                if (error) {
                                    res.status(500).json({"error": error.sqlMessage})
                                } else if (!rows[0]) {
                                    res.status(404).json({"error": "commentaire non trouvé"})
                                } else if (userId !== rows[0].userId && isAdmin !== 1) {
                                    res.status(400).json({"error": "l'utilisateur ne correspond pas"})
                                } else {
                                    // destruction du commentaire
                                    connection.query('DELETE FROM forum_commentary WHERE commentaryId = ?', [commentaryId], (error, rows) => {
                                        if (error) {
                                            res.status(500).json({"error": error.sqlMessage})
                                        } else {
                                            res.status(200).json({"message": "commentaire supprimé"})
                                        }
                                    })
                                }

                            })
                        }
                    }
                })
            }
            connection.release();
        })
    }
}
