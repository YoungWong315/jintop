const { generateId } = require('../../../modules/util')

class QuestionSchema {
  constructor(model) {
    this.model = model
  }
  // 增
  createOption ({ questionId, title, uid, questionnaireId }) {
    return this.model.create({
      optionId: generateId(),
      title,
      questionId,
      uid,
      questionnaireId,
    })
  }
  // 删
  deleteOption (optionId) {
    return this.model.destroy({
      where: { optionId }
    })
  }
  // 改
  modifyOptionTitle ({ optionId, title }) {
    return this.model.update(
      { title },
      { where: { optionId } }
    )
  }
  // 查
  getOptionsByQuestionId (questionId) {
    return this.model.findAll({
      where: { questionId },
    })
  }
}

module.exports = QuestionSchema
