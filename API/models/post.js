require('dotenv').config();

const mysql = require('mysql');
const Sequelize = require('sequelize');
const connection = new Sequelize('groupomania', 'root', process.env.MySQLPassword, {
    host: 'localhost',
    dialect: 'mysql'
}); //connecting with 3 arguments : db_name/user/password

const User = connection.define('user', {
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notNull: true,
            len: {
                args: [1, 500],
                msg: 'Veillez à ce que votre message ne dépasse pas 500 caractères mais en comporte au moins un 😉.'
            }
        }
    },
    image: {},
    postUser: {
        type: Sequelize.STRING,
        allowNull: false
    }
});