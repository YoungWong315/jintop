// 定义 Model 并返回 Model实例
const defineArticle = (sequelize, dataType) => {
  return sequelize.define('article', {
    articleId: {
      type: dataType.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    uid: {
      type: dataType.STRING,
      allowNull: false,
    },
    content: {
      type: dataType.STRING,
      allowNull: false,
    },
  })
}

module.exports = defineArticle
