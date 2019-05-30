const Database = require("../index");
const db = new Database();
const { Sequelize, sequelize } = db;

const User = sequelize.define("user", {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
User.sync(); // 同步表结构

module.exports = User;
