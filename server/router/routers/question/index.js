const { saveQuestionnaire, queryQuestinnarieList, queryQuestinnarieDetail, deleteQuestionnaire } = require('./handler')

const article = {}

article.inject = router => {
  router.post('/question/questionnaire/save', saveQuestionnaire)
  router.get('/question/questionnaire/list', queryQuestinnarieList)
  router.get('/question/questionnaire/detail', queryQuestinnarieDetail)
  router.post('/question/questionnaire/delete', deleteQuestionnaire)
}

module.exports = article
