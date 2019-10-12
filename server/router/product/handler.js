const dbInstance = require('../../database')
const productSchema = dbInstance.getSchema('product')

const { getCtxBody, getCtxQuery, successResponse } = require('../util')

exports.getProductAll = async ctx => {
  try {
    const product = await productSchema.getProductAll()
    successResponse(ctx, product)
  } catch (e) {
    throw { message: e }
  }
}
