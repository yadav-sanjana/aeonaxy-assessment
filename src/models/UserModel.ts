import { DataTypes } from "sequelize";
import { db } from "../config/db";

export const UserModel = db.define({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: "user",
    timestamps: true
})