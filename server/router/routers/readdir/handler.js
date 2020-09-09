const { getCtxBody, getCtxQuery, successResponse } = require('../../util')
const { getFilenamesInSpecificDir } = require('../../../modules/util/index')

const readDir = async ctx => {
  try {
    const { path } = getCtxBody(ctx)
    const files = getFilenamesInSpecificDir(path)
    successResponse(ctx, files)
  } catch (e) {
    throw { message: e }
  }
}

module.exports = {
  readDir,
}
