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
 * targetPath: 目录路径
 * level: 目录层级(level为0, 表示初始目录，pathRoot = '/', 其次level都为上层目录名, pathRoot = path.basename(targetPath))
 * return: 目录下所有文件的地址的数组(深层文件，返回的是相对path目录的内层路径)
 */
const getFilenamesInSpecificDir = (targetPath, level = 0) => {
  const path = require('path')
  const fs = require('fs')
  const files = fs.readdirSync(targetPath)

  let nextLevelFilesArr = []

  const filesArr = files.filter(filename => {
    const statPath = path.join(targetPath, filename)
    const stats = fs.statSync(statPath)
    if (stats.isDirectory()) {
      nextLevelFilesArr = getFilenamesInSpecificDir(statPath, level + 1)
      return false
    }
    return true
  })

  const alterFilesArr = [...filesArr, ...nextLevelFilesArr]
  const pathRoot = level === 0 ? '/' : path.basename(targetPath) // 拿到目录不同层级的相对路径名

  return alterFilesArr.map(filename => path.join(pathRoot, filename))
}

module.exports = {
  transTimeStamp,
  upsertWithModel,
  getFilenameInSpecificDir,
}
