const { getCtxBody, getCtxQuery, successResponse } = require('../../util')
const { getFilenamesInSpecificDir } = require('../../../modules/util/index')

const readDir = async ctx => {
  try {
    const { path } = getCtxBody(ctx)
    // 检查path是否存在
    const fs = require('fs')    
    if (!fs.existsSync(path)) {
      throw { message: '目录不存在' }
    }
    // 读取path内文件
    const files = getFilenamesInSpecificDir(path)
    successResponse(ctx, files)
  } catch (e) {
    throw { message: e }
  }
}

module.exports = {
  readDir,
}
