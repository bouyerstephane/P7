const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const limiter = require("./middleware/rateLimiter")

const userRoutes = require("./routes/user");
const forumRoutes = require("./routes/forum");

const app = express();

app.use(helmet());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(bodyParser.json());

app.use("/api/auth", limiter, userRoutes);
app.use("/api/forum", forumRoutes);

module.exports = app;
