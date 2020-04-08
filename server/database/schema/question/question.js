const { generateId } = require('../../../modules/util')

class QuestionSchema {
  constructor(model) {
    this.model = model
  }
  // 增
  createQuestion ({ questionnaireId, title, uid, type, index = 0 }) {
    return this.model.create({
      questionId: generateId(),
      title,
      type,
      questionnaireId,
      uid,
      index
    })
  }
  // 删
  deleteQuestion (questionId) {
    return this.model.destroy({
      where: { questionId }
    })
  }
  deleteQuestionByQuestionnaireId (questionnaireId) {
    return this.model.destroy({
      where: { questionnaireId }
    })
  }
  // 改
  modifyQuestionTitle ({ questionId = '', questionnaireId, title, uid, type, index = 0 }) {
    return this.model.findOrCreate({
      where: { questionId },
      defaults: { questionId: generateId(), title, type, questionnaireId, uid, index },
    }).spread((question, created) => {
      console.log(question)
      if (!created) {
        question.update(
          { title },
          { where: { questionId } }
        )
      }
    })
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
