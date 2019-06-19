const Database = require("../index");
const db = new Database();
const { Sequelize, sequelize } = db;

const User = sequelize.define("user", {
  uid: {
    type: Sequelize.STRING,
    allowNull: false
  },
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
User.sync({ alter: true }); // 同步表结构(alter:true,同步新字段)

module.exports = User;
