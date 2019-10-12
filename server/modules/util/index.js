/**
 * 时间戳转换
 * timeStamp: 传入时间戳
 * return: timeStamp代表的 "年、月、日、时、分、秒"
 */
const transTimeStamp = timeStamp => {
  const padTimeWithZero = time => (time < 10 ? '0' + time : time.toString())

  const dateTemp = new Date(timeStamp)
  const y = dateTemp.getFullYear(),
    m = dateTemp.getMonth() + 1,
    d = dateTemp.getDate(),
    h = dateTemp.getHours(),
    min = dateTemp.getMinutes(),
    s = dateTemp.getSeconds()
  return {
    year: y,
    month: padTimeWithZero(m),
    day: padTimeWithZero(d),
    hour: padTimeWithZero(h),
    minute: padTimeWithZero(min),
    second: padTimeWithZero(s),
  }
}

/**
 * 数据库方法封装（创建或更新）
 * Model: 操作模型
 * primaryKey: 校验是否重复主键
 * data: 创建或更新的数据库数据
 * return: 模型的创建或更新
 */
const upsertWithModel = Model => {
  const model = Model
  return async (primaryKey, data) => {
    const uniqueId = data[primaryKey]
    const result = await model.findOne({ where: { uniqueId } })
    if (result) {
      return model.update(data, { where: { uniqueId } })
    }
    return model.create(data)
  }
}

/**
 * 读取文件名(使用fs模块)
 * 用于依据 文件名 读取内容或进行初始化
 * path: 目录路径
 * withSuffix: 返回值是否带文件后缀名，默认false
 * return: 目录下所有文件的名字(只读取一层，若里面有更深的文件夹还未做处理)
 */
const getFilenameInSpecificDir = (path, withSuffix = false) => {
  const fs = require('fs')
  const dirs = fs.readdirSync(path)
  if (withSuffix) {
    return dirs
  }
  return dirs.map(filename => filename.split('.')[0])
}

module.exports = {
  transTimeStamp,
  upsertWithModel,
  getFilenameInSpecificDir,
}
