const { generateId } = require('../../../modules/util')

class QuestionnaireSchema {
  constructor(model) {
    this.model = model
  }
  // 增
  createQuestionnaire ({ uid, title }) {
    return this.model.create({
      questionnaireId: generateId(),
      uid,
      title,
    })
  }
  // 删
  deleteQuestionnaire (questionnaireId) {
    return this.model.destroy({
      where: { questionnaireId }
    })
  }
  // 改
  modifyQuestionnaireTitle ({ questionnaireId, title }) {
    return this.model.update(
      { title },
      { where: { questionnaireId } }
    )
  }
  // 查
  getQuestionnaireByUId (uid) {
    return this.model.findAll({
      where: { uid },
      order: [
        ['index', 'ASC']
      ]
    })
  }
  getQuestionnaireDetail (questionnaireId) {
    return this.model.findOne({
      where: { questionnaireId },
      order: [
        ['index', 'ASC']
      ]
    })
  }
}

module.exports = QuestionnaireSchema
