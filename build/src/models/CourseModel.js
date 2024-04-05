"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
exports.CourseModel = db_1.db.define("Course", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    level: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    instructor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
    },
    rating: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
    },
    studentsEnrolled: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    lessons: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'courses'
});
//# sourceMappingURL=CourseModel.js.map