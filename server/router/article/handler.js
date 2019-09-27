const {
  postArticle,
  getArticleByUid,
  getArticleByArticleId,
  getArticleAll,
} = require('../../database/schema/article')

const { getCtxBody, getCtxQuery, successResponse } = require('../util')

exports.postArticle = async ctx => {
  const { uid = '', content } = getCtxBody(ctx)
  console.log(uid, content)
  if (!content) {
    throw { message: 'content cant be blank' }
  }
  try {
    const result = await postArticle({ uid, content })
    console.log(result)
    successResponse(ctx, { msg: '发布成功' })
  } catch (e) {
    throw { message: e }
  }
}

exports.getArticleByUid = async ctx => {
  const { uid } = getCtxQuery(ctx)
  try {
    const article = await getArticleByUid(uid)
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

exports.getArticleAll = async ctx => {
  console.log(ctx)
  try {
    const article = await getArticleAll()
    console.log(article)
    successResponse(ctx, article)
  } catch (e) {
    throw { message: e }
  }
}
