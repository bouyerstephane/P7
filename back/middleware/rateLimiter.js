const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 1000,    // limite le nombre de requête à 20 max par IP
    message: "vous avez dépassé la limite autorisé de 100 requêtes, veuillez attendre 10minutes"
});

module.exports = limiter
