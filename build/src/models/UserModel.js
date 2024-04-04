"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
exports.UserModel = db_1.db.define({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: "user",
    timestamps: true
});
//# sourceMappingURL=UserModel.js.map