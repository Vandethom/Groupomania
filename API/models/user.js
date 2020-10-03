require('dotenv').config();

const mysql = require('../mysql');
const Sequelize = require('sequelize');
const connection = new Sequelize('groupomania', 'root', process.env.MySQLPassword, {
     host: 'localhost',
     dialect: 'mysql'
}); //connecting with 3 arguments : db_name/user/password

const User = connection.define('user', {
     name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
               isAlphanumeric: true // prevents code injection by allowing only alphanumeric characters
          }
     },
     surname: {
          type: Sequelize.STRING,
          validate: {
               isAlphanumeric: true // prevents code injection by allowing only alphanumeric characters
          }
     },
     pseudonym: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
               isAlphanumeric: true // prevents code injection by allowing only alphanumeric characters
          }
     },
     password: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
               notNull: true,
               len: {
                    args: [6, 25],
                    msg: 'Please enter a password with 6 to 25 characters.'
               } // only authorizes passwords from 6 to 25 chararacters
          }
     },
     gender: {
          type: Sequelize.STRING
     },
     email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
     },
     description: {
          type: Sequelize.TEXT,
          validate: {
               len: {
                    args: [10, 250],
                    msg: 'Please enter a description that goes from 10 to 250 characters.'
               }
          }
     }
});


/*
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
});

// module.exports


/*

'1', 'John', 'Wayne', 'The Good', 'H', 'john.wayne@westmail.com'
'2', 'Henry', 'MacCarty', 'Billy The Kid', 'H', 'kiddy@disney.com'
'3', 'Jane', 'Cannary', 'Calamity Jane', 'F', 'calamity@hotmail.fr'
'4', 'Johnny Peters', 'Ringo', 'Johnny Ringo', 'H', 'j.ringo@farw.com'

*/