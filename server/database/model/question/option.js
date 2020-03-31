// 定义 Model 并返回 Model实例
const defineOptions = (sequelize, dataType) => {
  return sequelize.define('option', {
    optionId: {
      type: dataType.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: dataType.STRING,
      allowNull: true,
    },
    questionId: {
      type: dataType.STRING,
      allowNull: false,
    },
    uid: {
      type: dataType.STRING,
      allowNull: false,
    },
    questionnaireId: {
      type: dataType.STRING,
      allowNull: false,
    },
    index: {
      type: dataType.STRING,
      allowNull: true,
    }
  })
}

module.exports = defineOptions
