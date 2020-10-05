/* ------------------------- Requirements ------------------------- */

/* -------------------- Security -------------------- */

const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sanitize = require('sanitize');
//const helmet = require('helmet');
require('dotenv').config();

/* -------------------- Libraries and connection -------------------- */

const mysql = require('mysql');
const Sequelize = require('sequelize');
const User = require('../models/user');
const { param } = require('../routes/user');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MySQLPassword,
    database: "groupomania"
});

/*const connection = new Sequelize('groupomania', 'root', process.env.MySQLPassword, {
    host: 'localhost',
    dialect: 'mysql'
}); //connecting with 3 arguments : db_name/user/password*/


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
                const name = req.body.name;
                const surname = req.body.surname;
                const pseudonym = req.body.pseudonym;
                const password = hash;
                const gender = req.body.gender;
                const email = maskEmail(req.body.email);
                const description = req.body.description;
                const user = `
                ('${name}',
                 '${surname}',
                  '${pseudonym}',
                   '${password}',
                    '${gender}',
                     '${email}',
                      '${description}')`;
                const sql =
                    `INSERT INTO Users (name, surname, pseudonym, password, gender, email, description) VALUES ${user}`;
                connection.query(sql, function (error, result) {
                    if (error) {
                        res.status(403).json({
                            error: `Veillez à créer un utilisateur qui n'existe pas déjà et en remplissant tous les champs.`
                        })
                    };
                    return res.status(201).json({
                        message: `L'utilisateur ${pseudonym} vient d'être ajouté aux profils.`
                    })
                    console.log(`${pseudonym} vient d\'être ajouté aux profils`);
                });
            });
    });
};

/* ------------------------- Signing In User ------------------------- */

exports.login = (req, res, next) => {
    connection.connect(function (error) {
        const email = maskEmail(req.body.email);
        const password = req.body.password;

        connection.query(
            `SELECT * FROM Users WHERE email=${email};`,
            function (error, response, fields) {
                if (error) {
                    throw error;
                }
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            return res.status(401).json({
                                error: 'Mot de passe incorrect.'
                            });
                        }
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign({
                                userId: user._id
                            }, process.env.token, {
                                expiresIn: '24h'
                            })
                        })
                    })
            });
    })
}

/*
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
        const userId = req.body.id;
        connection.query(
            `SELECT * FROM Users WHERE id=${userId};`,
            function (error, response, fields) {
                if (error) {
                    res.status(404).json({
                        error: `L'utilisateur que vous cherchez n'existe pas, tentez une reconnexion pour résoudre ce problème.`
                    })
                };
                return res.status(200).json({
                    message: response
                })
            });
    })
}

/* ------------------------- Delete Account ------------------------- */

exports.deleteUser = (req, res, next) => {
    connection.connect(function (error) {
        const userId = req.params.id;
        connection.query(
            `DELETE FROM Users WHERE id=${userId}`
        );
        if (error) {
            res.status(404).json({
                error: `L'utilisateur que vous cherchez n'existe pas, tentez de vous reconnecter pour résoudre ce problème.`
            })
        }
        return res.status(204).json({
            message: `${pseudonym} vient d\'être supprimé des profils existants`
        })
    })
}