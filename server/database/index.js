const consola = require('consola')
const Sequelize = require('sequelize')
const { db_config } = require('../../nuxt.config.js')

class Database {
  constructor() {
    this.Sequelize = Sequelize
    this.sequelize = new Sequelize(
      `${db_config.dialect}://${db_config.username}:${db_config.password}@${
        db_config.host
      }:${db_config.port}/${db_config.dbName}`,
    )
  }
  connect() {
    const { dialect, username, password, host, port, dbName } = db_config
    const sequelize = new Sequelize(
      `${dialect}://${username}:${password}@${host}:${port}/${dbName}`,
    )

    sequelize
      .authenticate()
      .then(() => {
        // 同步所有模型
        sequelize.sync()
        consola.success({
          message: `mysql connection has been established successfully, database: ${dbName}`,
          badge: true,
        })
      })
      .catch(err => {
        consola.error({
          message: `Unable to connect to the database: ${err}`,
          badge: true,
        })
      })
  }
}

module.exports = Database
