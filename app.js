const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const usersRouters = require("./routes/users");
const newsRouters = require("./routes/news");
const imagesRouters = require("./routes/images");
const buildsRouters = require("./routes/builds");
const championsRouters = require("./routes/champions");
const playersRouters = require("./routes/players");
const teamsRouters = require("./routes/teams");

mongoose.connect(process.env.DB_CONNECT);
mongoose.Promise = global.Promise;

const app = express();

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Prevent cors error
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    /*if (res.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods', 'PUT, PATCH, POST, GET, DELETE");
        return res.status(200).json({})
    }*/
    next()
});

// Routes which should handle requests
app.use('/users', usersRouters);
app.use('/news', newsRouters);
app.use('/images', imagesRouters);
app.use('/builds', buildsRouters);
app.use('/champions', championsRouters);
app.use('/players', playersRouters);
app.use('/teams', teamsRouters);
app.use('/teams', teamsRouters);

// Handle wrong routes
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error)
});
app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            status: error.status
        }
    })
});

module.exports = app;