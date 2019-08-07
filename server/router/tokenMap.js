/**
 * 设置需要登录的接口path为true，则index.js的中间件上将开启token的校验
 * */

const tokenMap = new Map()
tokenMap.set('/user/findAllUser', true)

module.exports = tokenMap
