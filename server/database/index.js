const consola = require('consola')
const Sequelize = require('sequelize')
const {
  db_config: { dialect, username, password, host, port, dbName },
} = require('../../nuxt.config.js')

const { getFilenameInSpecificDir } = require('../modules/util')

/**
 * schema 和 model的文件名需一一对应，初始化数据时依赖这个关系
 */
class Database {
  constructor() {
    this.instance = null
    this.Sequelize = Sequelize
    // 根据 model 目录下的文件 初始化 modelList
    this.modelList = getFilenameInSpecificDir(`${__dirname}/model`)
    this.schemaMap = new Map()
    this.sql = new Sequelize(
      `${dialect}://${username}:${password}@${host}:${port}/${dbName}`,
    )
  }
  static getSingletonInstance() {
    if (!this.instance) {
      this.instance = new Database()
    }
    return this.instance
  }
  async connect() {
    const sql = this.sql
    try {
      await sql.authenticate()
      this.defineModels()
      // 同步所有模型(alter:true,同步新字段)
      sql.sync({ alter: true })
      consola.success({
        message: `mysql connection has been established successfully, database: ${dbName}`,
        badge: true,
      })
    } catch (err) {
      consola.error({
        message: `Unable to connect to the database: ${err}`,
        badge: true,
      })
    }
  }
  defineModels() {
    this.modelList.forEach(modelName => {
      const defineModel = require(`./model/${modelName}`)
      // 定义Model
      const Model = defineModel(this.sql, this.Sequelize)

      // 根据Model，初始化对应的Schema
      const Schema = require(`./schema/${modelName}`)
      const schema = new Schema(Model)
      console.log(schema)
      this.schemaMap.set(modelName, schema)
    })
  }
  getSchema(schemaType) {
    return this.schemaMap.get(schemaType)
  }
}

module.exports = Database.getSingletonInstance()
