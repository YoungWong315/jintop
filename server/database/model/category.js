// 定义 Model 并返回 Model实例
const defineCategory = (sequelize, dataType) => {
  return sequelize.define('category', {
    categoryId: {
      type: dataType.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    rootId: {
      type: dataType.STRING,
      allowNull: false,
    },
    parentId: {
      type: dataType.STRING,
      allowNull: false,
    },
    name: {
      type: dataType.STRING,
      allowNull: false,
    },
  })
}

module.exports = defineCategory
