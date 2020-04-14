const {
  saveQuestionnaire,
  queryQuestinnarieList,
  queryQuestinnarieDetail,
  deleteQuestionnaire,
  modifyQuestionnaire,
  deleteOption,
  deleteQuestion,
  saveQuestionnaireResult
} = require('./handler')

const article = {}

article.inject = router => {
  router.post('/question/questionnaire/submit', saveQuestionnaireResult)
  router.post('/question/questionnaire/save', saveQuestionnaire)
  router.get('/question/questionnaire/list', queryQuestinnarieList)
  router.get('/question/questionnaire/detail', queryQuestinnarieDetail)
  router.post('/question/questionnaire/delete', deleteQuestionnaire)
  router.post('/question/questionnaire/modify', modifyQuestionnaire)
  router.post('/question/question/delete', deleteQuestion)
  router.post('/question/option/delete', deleteOption)
}

module.exports = article
