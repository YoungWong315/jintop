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
  modifyOptionTitle ({ optionId, title, uid, questionId, index = 0, checkedTimes = 0, questionnaireId }) {
    console.log({ optionId, title, uid, questionId, index, checkedTimes, questionnaireId })
    return this.model.findOrCreate({
      where: { optionId },
      defaults: { optionId: generateId(), title, questionId, uid, questionnaireId, index, checkedTimes }
    }).spread((option, created) => {
      console.log(option)
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
