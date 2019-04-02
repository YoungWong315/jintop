const consola = require("consola");
const Sequelize = require("sequelize");
const { db_config } = require("./nuxt.config.js");

// 需求：远端数据库连接失败，需要统一本地和远端的数据库用户和密码，把本地的数据库同步到线上

// 启动server
require("./server/index.js");

const connectDb = ({ dialect, username, password, host, port, dbName }) => {
  const sequelize = new Sequelize(`${dialect}://${username}:${password}@${host}:${port}/${dbName}`);

  sequelize
    .authenticate()
    .then(() => {
      consola.success({
        message: `mysql connection has been established successfully, database: ${dbName}`,
        badge: true
      });
    })
    .catch(err => {
      consola.error({
        message: `Unable to connect to the database: ${err}`,
        badge: true
      });
    });
};

connectDb(db_config);
