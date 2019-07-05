const router = require('koa-router')()
const koaBody = require('koa-body') // 处理post请求数据
const jwt = require('jsonwebtoken')
const crypto = require('../modules/crypto')

// 引入router<-->user处理模块
const user = require('./user')

const handler = async (ctx, next) => {
  const { url } = ctx.request
  console.log(`request url: ${url}`)
  try {
    ctx.status = 200
    const { data } = ctx.request.body
    if (data) ctx.request.body.data = crypto.decryptAES(data)
    await next() // next()中的错误都会catch到此处
  } catch (err) {
    ctx.status = err.status || 200
    ctx.body = {
      code: 0,
      err: {
        errMsg: err.message,
        errUrl: url,
      },
    }
  }
}

const tokenVerifier = async (ctx, next) => {
  const {
    url,
    header: { authorization },
  } = ctx.request
  // 认证token
  /* if (url.includes('/user/findAllUser')) {
    const { uid, iat, exp } = crypto.jwtVerify(authorization)
  } */
  await next()
}

router
  .use(
    koaBody({
      multipart: true,
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
      },
    }),
  )
  .use(handler)
  .use(tokenVerifier)

user.inject(router)

module.exports = router
