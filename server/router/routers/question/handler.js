const dbInstance = require('../../../database')
const questionnaireSchema = dbInstance.getSchema('questionnaire')
const questionSchema = dbInstance.getSchema('question')
const optionSchema = dbInstance.getSchema('option')

const { getCtxBody, getCtxQuery, successResponse, convertSequelizeObject } = require('../../util')

// 获取问卷列表
const queryQuestinnarieList = async ctx => {
  const { uid } = getCtxQuery(ctx)
  const questionnaire = await questionnaireSchema.getQuestionnaireByUId(uid)
  successResponse(ctx, questionnaire)
}

// 查询问卷详情
const queryQuestinnarieDetail = async ctx => {
  const { questionnaireid } = getCtxQuery(ctx)
  const questionnaire = convertSequelizeObject(await questionnaireSchema.getQuestionnaireDetail(questionnaireid))
  const questions = convertSequelizeObject(await questionSchema.getQuestionsByQuestionnaireId(questionnaireid))
  // forEach + async/await 会有问题，得到的 opiton 无法保存在 question 上，不晓得为什么 ----------<
  for (let question of questions) {
    const { type, questionId } = question
    switch (type) {
      case 'single':
        question.checked = null
        break;
      case 'multi':
        question.checked = []
        break;
    }
    const options = convertSequelizeObject(await optionSchema.getOptionsByQuestionId(questionId))
    question.options = options
  }
  questionnaire.questions = questions
  successResponse(ctx, questionnaire)
}

// 保存问卷
const saveQuestionnaire = async ctx => {
  try {
    const { title, questions, uid } = getCtxBody(ctx)
    const questionnaire = await questionnaireSchema.createQuestionnaire({ uid, title })
    questions.forEach(async question => {
      // 创建问题
      const { questionnaireId } = questionnaire
      const { title, type } = question
      const questionData = await questionSchema.createQuestion({ questionnaireId, uid, title, type })
      // 创建选项
      const { questionId } = questionData
      question.options.forEach(async option => {
        await optionSchema.createOption({ questionId, title: option.title, uid, questionnaireId })
      })
    })
    successResponse(ctx, questionnaire)
  } catch (e) {
    throw { message: e }
  }
}

module.exports = {
  saveQuestionnaire,
  queryQuestinnarieList,
  queryQuestinnarieDetail
}