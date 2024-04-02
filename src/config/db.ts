const { Sequelize } = require('sequelize');

export const db = new Sequelize('postgresql://aeonaxy-db_owner:npjdOX50ubMU@ep-mute-butterfly-a5nlu3gt.us-east-2.aws.neon.tech/aeonaxy-db?sslmode=require', {
    host: 'localhost',
    dialect: 'postgres'
})