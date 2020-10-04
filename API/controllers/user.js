/* ------------------------- Requirements ------------------------- */
const dotenv = require('dotenv');
require('dotenv').config();

const mysql = require('mysql');


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MySQLPassword,
    database: "groupomania"
});
const Sequelize = require('sequelize');
/*const connection = new Sequelize('groupomania', 'root', process.env.MySQLPassword, {
    host: 'localhost',
    dialect: 'mysql'
}); //connecting with 3 arguments : db_name/user/password*/

const models = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const helmet = require('helmet');


/* ------------------------- Masking mail in Database ------------------------- */

function maskEmail(email) {
    // function used with signUp and signIn in order to replace characters with '*'
    function mask(str) {
        if (str.length > 4) {
            return (
                str.substr(0, 1) +
                str.substr(1, str.length - 1).replace(/\w/g, "*") +
                str.substr(-1, 1)
            );
        }
        return str.replace(/\w/g, "*");
    }
    return email.replace(/([\w.]+)@([\w.]+)(\.[\w.]+)/g, function (
        m,
        p1,
        p2,
        p3
    ) {
        return mask(p1) + "@" + mask(p2) + p3;
    });
    return email;
}

/* ------------------------- Controllers ------------------------- */

/* ------------------------- Signing Up User ------------------------- */

exports.signup = (req, res, next) => {
    connection.connect(function (error) {
        if (error) throw err;
        const values = `('Martha Jane', 'Canary', 'Calamity Jane', '01081852', 'F', 'calmm@msn.fr', 'I am a f***ing gangster !')`;
        const sql = `INSERT INTO Users (name, surname, pseudonym, password, gender, email, description) 
        VALUES ${values}`;

        connection.query(sql, function (error, result) {
            if (error) throw error;
            console.log('L\'utilisateur vient d\être ajouté aux profils');
        })
    })
}


/* Celle qui fonctionne.... presque;
exports.signup = (req, res, next) => {
    connection.sync()
        .then(function () {
            const user = {
                name: 'Jake',
                surname: 'Rattlesnake',
                pseudonym: 'Rango',
                password: 'FarWest',
                gender: 'H',
                email: 'rango@aol.com',
                description: `Piller, truander, menacer. Tout un programme.`
            }
            User.create(user)
        })
        .then(data => res.status(201).json({
            message: 'Utilisateur créé !'
        }))
        .catch(error => res.status(500).json({ error: 'Try again !' }))
};

connection.sync().then(function () {
    User.create({
        name: 'Jake',
        surname: 'Rattlesnake',
        pseudonym: 'Rango',
        password: 'FarWest',
        gender: 'H',
        email: 'rango@aol.com',
        description: `Piller, truander, menacer. Tout un programme.`
    });
});*/
/* ---------------- To use in Signup
bcrypt
        .hash(req.body.password, 10) // hashes password 10 times
        .then((hash) => {
            const user = new User({
                email: maskEmail(sanitize(req.body.email)),
                password: sanitize(hash),
            });
            user
                .save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur créé !'
                }))
                .catch((error) => res.status(400).json({
                    error: 'Entrez un nom d\'utilisateur et un mot de passe correct'
                }))
        });
        */
/* ------------------------- Signing In User ------------------------- */

exports.login = (req, res, next) => {
    User.findOne({ email: maskEmail(req.body.email) })
        .then((valid) => {
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur non trouvé'
                })
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Mot de passe incorrect'
                        });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id }, process.env.token, {
                            expiresIn: '24h'
                        })
                    })
                })
                .then(() => res.json({ token }))
                .catch((error) => res.status(500).json({
                    error: 'Vous devez entrer un email et un mot de passe valides pour vous connecter.'
                })
                );
        })
        .catch((error) => res.status(500).json({ error }));
};

/* ------------------------- Retrieving Account Informations ------------------------- */

exports.getUser = (req, res, next) => {
    connection.connect(function (error) {
        if (error) throw err;
        connection.query("SELECT * FROM Users", function (error, result, fields) {
            if (error) throw error;
            console.log(result);
        });
    })
        .then((result) => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({ error: 'Bah ça marche pas.' }))
};