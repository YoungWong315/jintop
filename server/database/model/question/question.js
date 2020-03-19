// 定义 Model 并返回 Model实例
const defineQuestion = (sequelize, dataType) => {
  return sequelize.define('question', {
    questionId: {
      type: dataType.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: dataType.STRING,
      allowNull: true,
    },
    type: {
      type: dataType.STRING,
      allowNull: false
    },
    questionnaireId: {
      type: dataType.STRING,
      allowNull: false,
    },
    uid: {
      type: dataType.STRING,
      allowNull: false,
    },
  })
}

module.exports = defineQuestion
