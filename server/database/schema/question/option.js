const { generateId } = require('../../../modules/util')

class QuestionSchema {
  constructor(model) {
    this.model = model
  }
  // 增
  createOption ({ questionId, title, uid, questionnaireId, index = 0, checkedTimes = 0 }) {
    return this.model.create({
      optionId: generateId(),
      title,
      questionId,
      uid,
      questionnaireId,
      index,
      checkedTimes
    })
  }
  // 删
  deleteOption (optionId) {
    return this.model.destroy({
      where: { optionId }
    })
  }
  // 改
  modifyOptionTitle ({ questionId, title, uid, questionnaireId, index = 0, checkedTimes = 0 }) {
    return this.model.findOrCreate({
      where: { questionId },
      defaults: { title, uid, questionnaireId, index, checkedTimes }
    }).spread((option, created) => {
      if (!created) {
        option.update(
          { title },
          { where: { optionId } }
        )
      }
    })
  }
  // 查
  getOptionsByQuestionId (questionId) {
    return this.model.findAll({
      where: { questionId },
      order: [
        ['index', 'ASC']
      ]
    })
  }
}

module.exports = QuestionSchema
