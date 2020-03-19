const { saveQuestionnaire, queryQuestinnarieList } = require('./handler')

const article = {}

article.inject = router => {
  router.post('/question/questionnaire/save', saveQuestionnaire)
  router.get('/question/questionnaire/list', queryQuestinnarieList)
}

module.exports = article
