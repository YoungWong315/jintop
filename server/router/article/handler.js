const dbInstance = require('../../database')
const articleSchema = dbInstance.getSchema('article')

const { getCtxBody, getCtxQuery, successResponse } = require('../util')

exports.postArticle = async ctx => {
  const { uid = '', content } = getCtxBody(ctx)
  if (!content) {
    throw { message: 'content cant be blank' }
  }
  try {
    const result = await articleSchema.postArticle({ uid, content })
    successResponse(ctx, { msg: '发布成功' })
  } catch (e) {
    throw { message: e }
  }
}

exports.getArticleByUid = async ctx => {
  const { uid } = getCtxQuery(ctx)
  try {
    const article = await articleSchema.getArticleByUid(uid)
    successResponse(ctx, article)
  } catch (e) {
    throw { message: e }
  }
}

exports.getArticleByArticleId = async ctx => {
  const { articleId } = getCtxQuery(ctx)
  try {
    const article = await articleSchema.getArticleByArticleId(articleId)
    successResponse(ctx, article)
  } catch (e) {
    throw { message: e }
  }
}

exports.getArticleAll = async ctx => {
  console.log(ctx)
  try {
    const article = await articleSchema.getArticleAll()
    successResponse(ctx, article)
  } catch (e) {
    throw { message: e }
  }
}
