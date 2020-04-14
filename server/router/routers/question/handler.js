const dbInstance = require('../../../database')
const questionnaireSchema = dbInstance.getSchema('questionnaire')
const questionSchema = dbInstance.getSchema('question')
const optionSchema = dbInstance.getSchema('option')
const resultSchema = dbInstance.getSchema('result')

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
    questions.forEach(async (question, index) => {
      // 创建问题
      const { questionnaireId } = questionnaire
      const { title, type } = question
      const questionData = await questionSchema.createQuestion({ questionnaireId, uid, title, type, index })
      // 创建选项
      const { questionId } = questionData
      question.options.forEach(async (option, index) => {
        await optionSchema.createOption({ questionId, title: option.title, uid, questionnaireId, index })
      })
    })
    successResponse(ctx, questionnaire)
  } catch (e) {
    throw { message: e }
  }
}

// 删除问卷
const deleteQuestionnaire = async ctx => {
  try {
    const { questionnaireid } = getCtxQuery(ctx)
    await Promise.all([
      questionnaireSchema.deleteQuestionnaire(questionnaireid),
      questionSchema.deleteQuestionByQuestionnaireId(questionnaireid),
      optionSchema.deleteOptionByQuestionnaireId(questionnaireid)
    ])
    successResponse(ctx, true)
  } catch (e) {
    throw { message: e }
  }
}

// 修改问卷
const modifyQuestionnaire = async ctx => {
  try {
    const { questionnaireId, title, questions, uid } = getCtxBody(ctx)
    // 修改问卷标题
    const modifyArray = [questionnaireSchema.modifyQuestionnaireTitle({ questionnaireId, title })]
    // 修改问卷问题
    questions.forEach(async question => {
      const { questionId, title, type, index, checked } = question
      // 该问题存在，修改问题
      if (questionId) {
        modifyArray.push(questionSchema.modifyQuestionTitle(
          { questionId, questionnaireId, title, uid, type, checked, index }
        ))
        question.options.forEach(option => {
          const { optionId, title, index, checkedTimes } = option
          modifyArray.push(optionSchema.modifyOptionTitle(
            { optionId, title, uid, index, checkedTimes, questionnaireId, questionId }
          ))
        })
      } else {
        // 问题不存在，创建问题和选项
        const questionData = await questionSchema.createQuestion({ questionnaireId, uid, title, type, index })
        // 创建选项
        const { questionId } = questionData
        question.options.forEach(async (option, index) => {
          await optionSchema.createOption({ questionId, title: option.title, uid, questionnaireId, index })
        })
      }
    })
    await Promise.all(modifyArray)
    successResponse(ctx, true)
  } catch (e) {
    console.log(e)
    throw { message: e }
  }
}
// 删除问题
const deleteQuestion = async ctx => {
  try {
    const { questionid } = getCtxQuery(ctx)
    await Promise.all([
      questionSchema.deleteQuestion(questionid),
      optionSchema.deleteOptionByQuestionId(questionid)
    ])
    successResponse(ctx, true)
  } catch (e) {
    console.log(e)
    throw { message: e }
  }
}
// 删除选项
const deleteOption = async ctx => {
  try {
    const { optionid } = getCtxQuery(ctx)
    await optionSchema.deleteOption(optionid)
    successResponse(ctx, true)
  } catch (e) {
    console.log(e)
    throw { message: e }
  }
}
// 保存问卷结果
const saveQuestionnaireResult = async ctx => {
  try {
    const { userid } = getCtxQuery(ctx)
    const { questionnaireId, title: questionnaireTitle, questions } = getCtxBody(ctx)
    questions.forEach(async question => {
      const { questionId, title: questionTitle, type, options, checked } = question
      if (type === 'single') {
        options.forEach(async option => {
          const { optionId, title: optionTitle } = option
          if (checked === optionTitle) {
            await resultSchema.createResult({
              questionnaireId,
              questionnaireTitle,
              questionId,
              questionTitle,
              type,
              uid: userid,
              optionId,
              optionTitle
            })
          }
        })
      } else if (type === 'multi') {
        for (let check of checked) {
          for (let option of options) {
            const { title: optionTitle, optionId } = option
            if (check === optionTitle) {
              await resultSchema.createResult({
                questionnaireId,
                questionnaireTitle,
                questionId,
                questionTitle,
                type,
                uid: userid,
                optionId,
                optionTitle
              })
              continue
            }
          }
        }
      }
    })
    successResponse(ctx, true)
  } catch (e) {

  }
}

module.exports = {
  saveQuestionnaire,
  queryQuestinnarieList,
  queryQuestinnarieDetail,
  deleteQuestionnaire,
  modifyQuestionnaire,
  deleteQuestion,
  deleteOption,
  saveQuestionnaireResult
}