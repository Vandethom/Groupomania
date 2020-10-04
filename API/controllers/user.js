/* ------------------------- Requirements ------------------------- */
const dotenv = require('dotenv');
require('dotenv').config();

const mysql = require('mysql');
const sanitize = require('sanitize');
const helmet = require('helmet');


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
const { param } = require('../routes/user');
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
        bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
                if (error) throw err;
                const name = req.body.name;
                const surname = req.body.surname;
                const pseudonym = req.body.pseudonym;
                const password = hash;
                const gender = req.body.gender;
                const email = maskEmail(req.body.email);
                const description = req.body.description;
                const user = `('${name}', '${surname}', '${pseudonym}', '${password}', '${gender}', '${email}', '${description}')`;
                const sql =
                    `INSERT INTO Users (name, surname, pseudonym, password, gender, email, description) VALUES ${user}`;

                connection.query(sql, function (error, result) {
                    if (error) throw error;
                    console.log(`${pseudonym} vient d\'être ajouté aux profils`);
                });
            });
    });
};

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
        if (error) throw error;
        connection.query("SELECT * FROM Users", function (error, result, fields) {
            if (error) throw error;
            console.log(result);
        });
    })
        .then((result) => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({ error: 'Bah ça marche pas.' }))
};

/* ------------------------- Delete Account ------------------------- */

exports.deleteUser = (req, res, next) => {
    connection.connect(function (error) {
        if (error) throw error;
        const userId = req.params.id;
        connection.query(`DELETE FROM Users WHERE id=${userId}`);
        console.log(`${pseudonym} vient d\'être supprimé des profils existants`);
    })
}