const Database = require("../index");
const db = new Database();
const { Sequelize, sequelize } = db;

const User = sequelize.define("user", {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  phone: Sequelize.STRING,
  role: Sequelize.STRING
});

module.exports = User;
