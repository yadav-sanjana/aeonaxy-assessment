import { DataTypes } from "sequelize";
import { db } from "../config/db";

export const CourseModel = db.define({
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'course'
})