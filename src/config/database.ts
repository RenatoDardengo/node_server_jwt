require("dotenv").config();
const database = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000, 
        idle: 10000
    }
}


module.exports = database;