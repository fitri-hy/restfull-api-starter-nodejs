const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbDialect = process.env.DB || 'mysql';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: dbDialect,
    port: process.env.DB_PORT,
	logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

sequelize.authenticate()
  .then(() => console.log(`Connection to ${dbDialect} has been established successfully.`))
  .catch(err => console.error('Unable to connect to the database:', err));

const closeDbConnection = async () => {
    try {
        await sequelize.close();
        console.log('Database connection closed gracefully.');
    } catch (err) {
        console.error('Error closing database connection:', err);
    }
};

module.exports = {
    sequelize,
    closeDbConnection
};
