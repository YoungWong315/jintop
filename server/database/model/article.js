const Database = require('../index')
const db = Database.getSingletonInstance()
const { Sequelize, sequelize } = db

const Article = sequelize.define('article', {
  articleId: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})
Article.sync({ alter: true }) // 同步表结构(alter:true,同步新字段)

module.exports = Article
