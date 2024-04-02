"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const { Sequelize } = require('sequelize');
exports.db = new Sequelize('postgresql://aeonaxy-db_owner:npjdOX50ubMU@ep-mute-butterfly-a5nlu3gt.us-east-2.aws.neon.tech/aeonaxy-db?sslmode=require', {
    host: 'localhost',
    dialect: 'postgres'
});
//# sourceMappingURL=db.js.map