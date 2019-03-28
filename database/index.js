const mysql = require("mysql");
const Sequelize = require("sequelize");
const consola = require("consola");

const config = {
  host: "127.0.0.1",
  user: "root",
  port: "3306",
  password: "1123581321wy.",
  database: "jintop_db"
};

function connect({ user, password, host, port, database }) {
  const sequelize = new Sequelize(`mysql://${user}:${password}@${host}:${port}/${database}`);

  sequelize
    .authenticate()
    .then(() => {
      consola.success({
        message: `mysql connection has been established successfully, database: ${database}`,
        badge: true
      });
    })
    .catch(err => {
      consola.error({
        message: `Unable to connect to the database: ${err}`,
        badge: true
      });
    });
}

connect(config);
