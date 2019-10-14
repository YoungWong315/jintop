const consola = require('consola')
const Sequelize = require('sequelize')
const path = require('path')
const {
  db_config: { dialect, username, password, host, port, dbName },
} = require('../../nuxt.config.js')

const { getFilenamesInSpecificDir } = require('../modules/util')

/**
 * schema 和 model的文件名需一一对应，初始化数据时依赖这个关系
 */
class Database {
  constructor() {
    this.instance = null
    this.Sequelize = Sequelize
    // 根据 model 目录下的文件 初始化 modelList, modelList存储的是所有 model的相对路径(针对当前目录)
    this.modelList = getFilenamesInSpecificDir(`${__dirname}/model`)
    // model的操作函数集合
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
    this.modelList.forEach(modelPath => {
      const defineModel = require(`./model${modelPath}`)
      // 定义Model
      const Model = defineModel(this.sql, this.Sequelize)

      // 根据Model，初始化对应的Schema
      const Schema = require(`./schema${modelPath}`)
      const schema = new Schema(Model)
      this.schemaMap.set(path.basename(modelPath, '.js'), schema)
    })
  }
  getSchema(schemaType) {
    return this.schemaMap.get(schemaType)
  }
}

module.exports = Database.getSingletonInstance()
