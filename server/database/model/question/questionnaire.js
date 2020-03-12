// 定义 Model 并返回 Model实例
const defineQuestionnaire = (sequelize, dataType) => {
  return sequelize.define('questionnaire', {
    questionnaireId: {
      type: dataType.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: dataType.STRING,
      allowNull: false,
    },
    uid: {
      type: dataType.STRING,
      allowNull: false,
    }
  })
}

module.exports = defineQuestionnaire
