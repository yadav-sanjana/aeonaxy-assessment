import { DataTypes } from "sequelize";
import { db } from "../config/db";

export const UserModel = db.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    profile_pic : {
        type : DataTypes.STRING,
        allowNull : true
    },
    status : {
        type : DataTypes.ENUM,
        values : ["active", "inactive", "suspended", "deleted"],
        default : "active"
    }
}, {
    timestamps: true,
})