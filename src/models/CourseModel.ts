import { DataTypes } from "sequelize";
import { db } from "../config/db";

export const CourseModel = db.define("Course", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: true
    },
    instructor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    studentsEnrolled: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    lessons: {
        type: DataTypes.JSON,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'courses'
});
