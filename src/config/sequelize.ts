import { Sequelize } from 'sequelize';
const config = require("@src/config/database")
const sequelize = new Sequelize(config)



module.exports = sequelize;