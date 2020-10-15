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
        const userId = req.body.userId;
        const post = `(
            '${body}',
            '${userId}'
        )`;
        const sql =
            `INSERT INTO Posts (body, userId) VALUES ${post}`;

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

/* ------------------------- Get one post ------------------------- */

exports.getOnePost = (req, res, next) => {
    connection.getConnection(function (error) {
        const postId = req.params.id;

        connection.query(
            `SELECT * FROM Posts WHERE id=${postId}`,
            function (error, response, fields) {
                if (error) {
                    res.status(404).json({
                        error: `La page que vous recherchez n'existe pas, tentez à nouveau avec une recherche correcte.`
                    })
                };
                res.status(200).json({
                    message: `Voici les résultats recherchés : ` + response
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