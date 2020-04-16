const { generateId } = require('../../../modules/util')

class ResultSchema {
  constructor(model) {
    this.model = model
  }
  // 增
  createResult ({
    questionnaireId,
    questionnaireTitle,
    questionId,
    questionTitle,
    optionId,
    optionTitle,
    type,
    uid = '',
  }) {
    return this.model.create({
      resultId: generateId(),
      questionnaireId,
      questionnaireTitle,
      questionId,
      questionTitle,
      optionId,
      optionTitle,
      type,
      uid
    })
  }
  // 删
  deleteResult (resultId) {
    return this.model.destroy({
      where: { resultId }
    })
  }
  // 查
  getResultByQuestionId ({
    questionnaireId = null,
    questionId = null,
  }) {
    return this.model.findAll({
      where: {
        questionnaireId,
        questionId,
      },
    })
  }
  getResultByOptionId ({
    questionnaireId = null,
    questionId = null,
    optionId = null,
  }) {
    return this.model.findAll({
      where: {
        questionnaireId,
        questionId,
        optionId,
      },
    })
  }
}

module.exports = ResultSchema
