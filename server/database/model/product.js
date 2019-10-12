// 定义 Model 并返回 Model实例
const defineProduct = (sequelize, dataType) => {
  return sequelize.define('product', {
    uniqueId: {
      type: dataType.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    pid: {
      type: dataType.STRING,
      allowNull: false,
    },
    title: {
      type: dataType.STRING,
    },
    imgurl: {
      type: dataType.STRING,
    },
    plink: {
      type: dataType.STRING,
    },
    category: {
      type: dataType.STRING,
    },
  })
}

module.exports = defineProduct
