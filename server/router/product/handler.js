const { getProductAll } = require('../../database/schema/product')

const { getCtxBody, getCtxQuery, successResponse } = require('../util')

exports.getProductAll = async ctx => {
  try {
    const product = await getProductAll()
    successResponse(ctx, product)
  } catch (e) {
    throw { message: e }
  }
}
