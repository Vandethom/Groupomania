const dotenv = require('dotenv');

const mysql = require('mysql');

module.exports = {
    user: 'root',
    host: 'localhost',
    password: process.env.MySQLPassword,
    database: 'groupomania',
    dialect: 'mysql'
};