const { generateId } = require('../../../modules/util')

class QuestionSchema {
  constructor(model) {
    this.model = model
  }
  // 增
  createQuestion ({ questionnaireId, title, uid }) {
    return this.model.create({
      questionId: generateId(),
      title,
      questionnaireId,
      uid
    })
  }
  // 删
  deleteQuestion (questionId) {
    return this.model.destroy({
      where: { questionId }
    })
  }
  // 改
  modifyQuestionTitle ({ questionId, title }) {
    return this.model.update(
      { title },
      { where: { questionId } }
    )
  }
  // 查
  getQuestionsByQuestionnaireId (QuestionnaireId) {
    return this.model.findAll({
      where: { QuestionnaireId },
    })
  }
}

module.exports = QuestionSchema
