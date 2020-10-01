require('dotenv').config()

const Sequelize = require('sequelize');
const connection = new Sequelize('groupomania', 'root', 'Nogotheg7', {
     host: 'localhost',
     dialect: 'mysql'
}); //connecting with 3 arguments : db_name/user/password

const User = connection.define('user', {
     name: Sequelize.STRING,
     surname: Sequelize.STRING,
     pseudonym: Sequelize.STRING,
     password: Sequelize.STRING,
     gender: Sequelize.STRING,
     email: Sequelize.STRING,
     description: Sequelize.TEXT
});

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