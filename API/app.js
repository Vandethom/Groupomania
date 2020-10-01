/* ------------------------------ Libraries ------------------------------ */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const req = require('request');
const res = require('res');

const mysql = require('mysql');

require('dotenv').config()

/* ------------------------------ Routes ------------------------------ */

//const userRoutes = require('./routes/user');



/* ------------------------------ Server Connexion ------------------------------ */


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: process.env.MySQLPassword,
    database: 'groupomania'
});



app.get('/insert', (req, res, next => {
    db.query("INSERT INTO Users (name, surname, pseudonym, gender, email) VALUES ('Johnny Peters', 'Ringo', 'Johnny Ringo', 'H', 'j.ringo@farw.com');",
        (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(result);
        })
}))

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
//app.use('/api/posts', sauceRoutes);
//app.use('/api/auth', userRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({
                error: "JWT token has expired, please login to obtain a new one"
            });
        }
        res.locals.loggedInUser = await User.findById(userId);
        next();
    } else {
        next();
    }
});

module.exports = app;