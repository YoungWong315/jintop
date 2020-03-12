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
 * 读取文件名(使用fs模块) 没有解决同级有多个目录的情况
 * 用于依据 文件名 读取内容或进行初始化
 * @param {String} targetPath: 目录路径
 * @return: 目录下所有文件的地址的数组(绝对路径)
 */
const getFilenamesInSpecificDir = (targetPath) => {
  const path = require('path')
  const fs = require('fs')

  const ignoreFiles = ['.DS_Store']
  let results = []

  const files = fs.readdirSync(targetPath)
  files.forEach(file => {
    const noIgnoreFile = ignoreFiles.every(item => file.indexOf(item) === -1)
    if (noIgnoreFile) {
      file = path.join(targetPath, file)
      const stats = fs.statSync(file)
      if (stats.isDirectory()) {
        results = results.concat(getFilenamesInSpecificDir(file))
      } else {
        results.push(file);
      }
    }
  })

  return results
}

/**
 *
*/
function mkdirSync (dirname) {
  const fs = require('fs')
  if (fs.existsSync(dirname)) {
    return true
  } else {
    fs.mkdirSync(dirname)
    return true
  }
  return false
}

/**
 * 生成除userId外的所有id方法，
 * return: 前14位是日期+时间，后面是shortid生成的唯一标识
 */
const generateId = () => {
  const shortid = require('shortid')
  const { year, month, day, hour, minute, second } = transTimeStamp(
    new Date().getTime(),
  )
  return year + month + day + hour + minute + second + shortid.generate()
}

module.exports = {
  transTimeStamp,
  upsertWithModel,
  getFilenamesInSpecificDir,
  generateId,
  mkdirSync
}
