"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const { Sequelize } = require('sequelize');
require('dotenv').config();
const dbUrl = process.env.DB_URL;
exports.db = new Sequelize(dbUrl, {
    host: 'localhost',
    dialect: 'postgres'
});
//# sourceMappingURL=db.js.map