const getCtxBody = ctx => ctx.request.body.data // 返回请求参数的bodydata
const getCtxQuery = ctx => ctx.query // 返回请求参数的query
const successResponse = (ctx, data) => (ctx.body = { code: 1, data }) // 响应code = 1, 数据为传入的data

module.exports = {
  getCtxBody,
  getCtxQuery,
  successResponse,
}
