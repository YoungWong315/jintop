const dbInstance = require('../../../database')
const questionnaireSchema = dbInstance.getSchema('questionnaire')
const questionSchema = dbInstance.getSchema('question')
const optionSchema = dbInstance.getSchema('option')

const { getCtxBody, getCtxQuery, successResponse } = require('../../util')

// 保存问卷
const saveQuestionnaire = async ctx => {
  try {
    const { title, questions, uid } = getCtxBody(ctx)
    console.log(questions)
    const questionnaire = await questionnaireSchema.createQuestionnaire({ uid, title })
    console.log(questionnaire)
    questions.forEach(async question => {
      console.log(question)
      // TODO: 创建问题
      const { questionnaireId } = questionnaire
      const { title } = question
      const questionData = await questionSchema.createQuestion({ questionnaireId, title })
      // TODO: 创建选项
      question.options.forEach(async option => {
        const { questionId } = questionData
        const { title } = option
        const optionData = await optionSchema.createOption({ questionId, title })
        console.log(optionData)
      })
    })
    successResponse(ctx, questionnaire)
  } catch (e) {
    throw { message: e }
  }
}

module.exports = {
  saveQuestionnaire
}