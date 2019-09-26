const {
  postArticle,
  getArticleByUserId,
  getArticleByArticleId,
  getArticleAll,
} = require('../../database/schema/article')

const { getCtxBody, getCtxQuery, successResponse } = require('../util')

exports.postArticle = async ctx => {
  const { userId = '', content } = getCtxBody(ctx)
  if (!content) {
    throw { message: 'content cant be blank' }
  }
  try {
    await postArticle({ userId, content })
    successResponse(ctx, { msg: '发布成功' })
  } catch (e) {
    throw { message: e }
  }
}

exports.getArticleByUserId = async ctx => {
  const { userId } = getCtxQuery(ctx)
  try {
    const article = await getArticleByUserId(userId)
    console.log(article)
    successResponse(ctx, article)
  } catch (e) {
    throw { message: e }
  }
}

exports.getArticleByArticleId = async ctx => {
  const { articleId } = getCtxQuery(ctx)
  try {
    const article = await getArticleByArticleId(articleId)
    console.log(article)
    successResponse(ctx, article)
  } catch (e) {
    throw { message: e }
  }
}

exports.getArticleAll = async () => {
  try {
    const article = await getArticleAll()
    console.log(article)
    successResponse(ctx, article)
  } catch (e) {
    throw { message: e }
  }
}
