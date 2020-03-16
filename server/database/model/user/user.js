// 定义 Model 并返回 Model实例
const defineUser = (sequelize, dataType) => {
  return sequelize.define('user', {
    uid: {
      type: dataType.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: dataType.STRING,
      allowNull: false,
    },
    password: {
      type: dataType.STRING,
      allowNull: false,
    },
    phone: {
      type: dataType.STRING,
      allowNull: true,
    },
    role: {
      type: dataType.STRING,
      allowNull: false,
    },
  })
}

module.exports = defineUser
