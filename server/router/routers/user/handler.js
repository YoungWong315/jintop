const crypto = require('../../../modules/crypto')

const dbInstance = require('../../../database')
const userSchema = dbInstance.getSchema('user')

const { getCtxBody, getCtxQuery, successResponse } = require('../../util')

exports.register = async ctx => {
  const { username, psd: password } = getCtxBody(ctx)
  // 检查用户名是否存在
  if (!(await userSchema.checkUsernameExist(username))) {
    const result = await userSchema.register({ username, password })
    const { uid, username: uName, role } = result
    // 发放token
    const tokenExpires = 48
    const data = {
      uid,
      username: uName,
      role,
      token: crypto.jwtSign({ uid }, `${tokenExpires}h`),
      expires: new Date().getTime() + tokenExpires * 60 * 60 * 1000 // token过期时间
    }
    successResponse(ctx, data)
  } else {
    throw { message: '用户名已被占用' }
  }
}

exports.registerAdmin = async ctx => {
  const result = await userSchema.registerAdmin(getCtxBody(ctx))
  successResponse(ctx, result)
}

exports.login = async ctx => {
  const { username, psd } = getCtxBody(ctx)
  const user = await userSchema.findByUsername(username)

  if (user) {
    const { password, uid, role } = user
    if (password === psd) {
      // 响应数据
      const tokenExpires = 48
      const data = {
        uid,
        username,
        role,
        token: crypto.jwtSign({ uid }, `${tokenExpires}h`),
        expires: new Date().getTime() + tokenExpires * 60 * 60 * 1000 // token过期时间
      }
      successResponse(ctx, data)
    } else {
      throw { message: '用户名或密码错误' } // 抛出的对象，作为err参数，进入到handler的catch中
    }
  } else {
    throw { message: '用户不存在' }
  }
}

exports.findByUsername = async ctx => {
  const { username } = getCtxBody(ctx)
  const res = await userSchema.findByUsername(username)
  successResponse(ctx, res)
}

exports.findAllUser = async ctx => {
  const { page, size } = getCtxQuery(ctx)
  const result = await userSchema.findAllUser()

  successResponse(ctx, result)
}
