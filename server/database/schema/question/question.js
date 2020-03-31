const { generateId } = require('../../../modules/util')

class QuestionSchema {
  constructor(model) {
    this.model = model
  }
  // 增
  createQuestion ({ questionnaireId, title, uid, type, checked = '', index = 0 }) {
    return this.model.create({
      questionId: generateId(),
      title,
      type,
      questionnaireId,
      uid,
      checked,
      index
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
      order: [
        ['index', 'ASC']
      ]
    })
  }
}

module.exports = QuestionSchema
