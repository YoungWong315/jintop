const { postArticle } = require('../../database/schema/article')

exports.postArticle = async ctx => {
  const { userId, content } = ctx.request.body.data
  if (!userId) {
    throw { message: 'userId is required' }
  }
  if (!content) {
    throw { message: 'content cant be blank' }
  }
  await postArticle({ userId, content })
  ctx.body = {
    code: 1,
    data: { msg: '发布成功' },
  }
}
