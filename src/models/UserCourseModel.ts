import { DataTypes } from 'sequelize';
import { db } from '../config/db';
import { UserModel } from './UserModel';
import { CourseModel } from './CourseModel';

export const UserCourse = db.define('UserCourse', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'user_courses',
    timestamps: false
});

//relation
UserCourse.belongsTo(UserModel, { foreignKey: 'userId', as: 'user_details' });
UserCourse.belongsTo(CourseModel, { foreignKey: 'courseId', as: 'course_details' });