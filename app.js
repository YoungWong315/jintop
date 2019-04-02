const consola = require("consola");
const Sequelize = require("sequelize");
const { db_config } = require("./nuxt.config.js");

// 需求：修改一波配置，使线上资源可以访问。还需处理favicon的访问问题，目前还访问不到

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
