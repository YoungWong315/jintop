// 定义 Model 并返回 Model实例
const defineQuestionnaireResult = (sequelize, dataType) => {
  return sequelize.define('result', {
    resultId: {
      type: dataType.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    questionnaireId: {
      type: dataType.STRING,
      allowNull: false,
    },
    questionnaireTitle: {
      type: dataType.STRING,
      allowNull: false,
    },
    questionId: {
      type: dataType.STRING,
      allowNull: false,
    },
    questionTitle: {
      type: dataType.STRING,
      allowNull: false,
    },
    optionId: {
      type: dataType.STRING,
      allowNull: false,
    },
    optionTitle: {
      type: dataType.STRING,
      allowNull: false,
    },
    type: {
      type: dataType.STRING,
      allowNull: false,
    },
    uid: {
      type: dataType.STRING,
      allowNull: true,
    },
  })
}

module.exports = defineQuestionnaireResult
