/* ------------------------- Requirements ------------------------- */

/* -------------------- Security -------------------- */

const dotenv = require('dotenv');
require('dotenv').config;
const sanitize = require('sanitize');

/* -------------------- Libraries and connection -------------------- */

const Post = require('../models/post');
const mysql = require('mysql');
const Sequelize = require('sequelize');
const { param } = require('../routes/post');

const connection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: process.env.MySQLPassword,
    database: 'groupomania'
});

/* ------------------------- Controllers ------------------------- */

/* ------------------------- Create new post ------------------------- */

exports.createPost = (req, res, next) => {
    connection.getConnection(function (error) {
        const body = req.body.body;
        const userPseudonym = req.body.userPseudonym;
        const post = `(
            "${body}",
            "${userPseudonym}"
        )`;
        console.log(post)
        const sql =
            `INSERT INTO Posts (body, userPseudonym) VALUES ${post}`;

        connection.query(sql, function (error, response) {
            if (error) {
                return res.status(403).json({
                    error: `Remplissez correctement tous les champs avant d'envoyer votre requête.`
                });
            }
            return res.status(201).json({
                message: `Votre article a bien été enregistré.`
            });
        })
    })
};

/* ------------------------- Get all posts ------------------------- */

exports.getAllPosts = (req, res, next) => {
    connection.getConnection(function (error) {
        const postId = req.body.id;
        const userId = req.params.userId;

        connection.query(
            `SELECT * FROM Posts;`,
            function (error, response, fields) {
                if (error) {
                    res.status(404).json({
                        error: `Vous n'êtes pas au bon endroit, tentez de recharger la page avec le bon URL pour afficher ce contenu.`
                    })
                }
                res.status(200).json({
                    response
                })
            }
        )
    })
};

/* ------------------------- Get Post's User's name ------------------------- */
/*
exports.getPostsUser = (req, res, next) => {
    const userId = req.params.userId;
    const mySQL2 =
        `USE groupomania;
    SELECT Users.name
    FROM Users
    Inner JOIN Posts
    ON Posts.userId
    WHERE Posts.userId =35yy;`

    connection.query(
        mySQL2, function (error, response, fields) {
            if (error) {
                res.status(500).json({
                    error: `Une erreur s'est produite lors du chargement de l'utilisateur. Assurez-vous de chercher un utilisateur existant.`
                })
            }
            res.status(200).json({
                response
            })
        })
}


/* ------------------------- Get one post ------------------------- */

exports.getOnePost = (req, res, next) => {
    connection.getConnection(function (error) {
        const postId = req.params.id;
        const userId = req.params.userId;

        const mySQL = `SELECT * FROM Posts WHERE id=${postId}`

        connection.query(
            mySQL, function (error, response, fields) {
                if (error) {
                    res.status(404).json({
                        error: `La page que vous recherchez n'existe pas, tentez à nouveau avec une recherche correcte.`
                    })
                };
                res.status(200).json({
                    response
                });
            }
        );
    });
};

/* ------------------------- Update a post ------------------------- */

exports.editPost = (req, res, next) => {

};

/* ------------------------- Delete a post ------------------------- */

exports.deletePost = (req, res, next) => {
    connection.getConnection(function (error) {
        const postId = req.params.id;

        connection.query(
            `DELETE FROM Posts WHERE postId=${postId}`,
            function (error, response, fields) {
                if (error) {
                    res.status(500).json({
                        error: `L'article que vous souhaitez supprimer n'existe pas.`
                    });
                }
                res.status(204).json({
                    message: `L'article souhaité a bien été supprimé.`
                });
            }
        );
    });
};

/* ------------------------- Like a post ------------------------- */

exports.likePost = (req, res, next) => {

};


/*
SQL Request to display name of user posting

`USE groupomania;
SELECT Users.name
FROM Users
Inner JOIN Posts
ON Posts.userId
WHERE Posts.userId =${userId};`

*/