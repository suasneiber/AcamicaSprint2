require('dotenv').config()
const Sequelize = require('sequelize')

const connection = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_USER, process.env.MYSQL_PASS, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
        define: {
            freezeTableName: true
    }
});


module.exports = connection;