const Database = require('../index')
const db = Database.getSingletonInstance()
const { Sequelize, sequelize } = db

const Product = sequelize.define('product', {
  uniqueId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  pid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
  },
  imgurl: {
    type: Sequelize.STRING,
  },
  plink: {
    type: Sequelize.STRING,
  },
})
Product.sync({ alter: true }) // 同步表结构(alter:true,同步新字段)

module.exports = Product
