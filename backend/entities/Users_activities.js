import db from '../dbConfig.js'
import {DataTypes} from 'sequelize'

const Users_activities = db.define("Users_activities", {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    activityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    }
});

export default Users_activities;