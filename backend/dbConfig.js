import Sequelize from "sequelize";
import env from "dotenv";

env.config();

const db = new Sequelize({
    dialect: process.env.DIALECT,
    database: process.env.DATABASE,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    logging: false,
    define: {
    timestamps: false,
    freezeTableName: true
    },
    timezone: '+02:00'
});

export default db;
