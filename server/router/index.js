const router = require('koa-router')()
const koaBody = require('koa-body') // 处理post请求数据
const crypto = require('../modules/crypto')

// 引入router的处理模块
const user = require('./user')
const article = require('./article')
const product = require('./product')

// 引入需要token校验的接口map
const tokenMap = require('./tokenMap')

/**
 * 接口统一处理handler:
 * 1. 对成功的请求设置status=200，并AES解密bodyData
 * 2. catch到next()中throw出的错误，设置对应相应body。响应错误格式为：err: { errMsg: '', errUrl: '' }
 * 3. 响应body统一格式：
 * ctx.body = {
    code: 0 || 1 || -1,  ------------->  (0: 业务错误，1: 业务成功, -1: 登录状态失效)
    data: {}             ------------->  (业务成功返回的数据)
    err: {               ------------->  (业务错误返回的错误)
      errMsg: err.message,  ---------->  (错误信息)
      errUrl: url,       ------------->  (错误接口)
    },
  }
*/
const handler = async (ctx, next) => {
  const { url } = ctx.request
  console.log(`request url: ${url}`)
  try {
    ctx.status = 200
    /* const { data } = ctx.request.body
    if (data) ctx.request.body.data = crypto.decryptRSA(data) */
    await next() // next()中的throw错误都会catch到此处
  } catch (err) {
    ctx.status = err.status || 200
    ctx.body = {
      code: err.code || 0,
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
  if (tokenMap.get(url.split('?')[0])) {
    try {
      const { uid, iat, exp } = crypto.jwtVerify(authorization)
      console.log({ uid, iat, exp })
    } catch (err) {
      throw {
        code: -1,
        message: `${err.message}, expireAt: ${err.expiredAt}`,
      }
    }
  }
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

// 注入接口
user.inject(router)
article.inject(router)
product.inject(router)

module.exports = router
