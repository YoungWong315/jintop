const { generateId } = require('../../../modules/util')

class QuestionSchema {
  constructor(model) {
    this.model = model
  }
  // 增
  createQuestion ({ questionnaireId, title, uid, type }) {
    return this.model.create({
      questionId: generateId(),
      title,
      type,
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
  getQuestionsByQuestionnaireId (questionnaireId) {
    return this.model.findAll({
      where: { questionnaireId },
    })
  }
}

module.exports = QuestionSchema
