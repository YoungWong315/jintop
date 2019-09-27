const Database = require('../index')
const db = new Database()
const { Sequelize, sequelize } = db

const Article = sequelize.define('article', {
  articleId: {
    type: Sequelize.STRING,
    allowNull: false,
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
