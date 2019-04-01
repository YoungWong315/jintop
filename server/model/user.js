const Sequelize = require("sequelize");
const { db_config } = require("../../nuxt.config.js");

// 链接数据库
const sequelize = new Sequelize(
  `${db_config.dialect}://${db_config.username}:${db_config.password}@${db_config.host}:${db_config.port}/${
    db_config.dbName
  }`
);

const User = sequelize.define("user", {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  phone: Sequelize.STRING,
  role: Sequelize.STRING
});

module.exports = User;
