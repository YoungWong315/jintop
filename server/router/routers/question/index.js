const { saveQuestionnaire, queryQuestinnarieList, queryQuestinnarieDetail } = require('./handler')

const article = {}

article.inject = router => {
  router.post('/question/questionnaire/save', saveQuestionnaire)
  router.get('/question/questionnaire/list', queryQuestinnarieList)
  router.get('/question/questionnaire/detail', queryQuestinnarieDetail)
}

module.exports = article
