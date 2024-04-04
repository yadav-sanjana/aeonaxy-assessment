const { Sequelize } = require('sequelize');
require('dotenv').config();
const dbUrl = process.env.DB_URL

export const db = new Sequelize(dbUrl, {
    host: 'localhost',
    dialect: 'postgres'
})