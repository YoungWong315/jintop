/**
 * 时间戳转换
 * timeStamp: 传入时间戳
 * return: timeStamp代表的 "年、月、日、时、分、秒"
 */
const transTimeStamp = timeStamp => {
  const getRightTimeFormat = time => (time < 10 ? '0' + time : time)

  const dateTemp = new Date(timeStamp)
  const y = dateTemp.getFullYear(),
    m = dateTemp.getMonth() + 1,
    d = dateTemp.getDate(),
    h = dateTemp.getHours(),
    min = dateTemp.getMinutes(),
    s = dateTemp.getSeconds()
  return {
    year: y,
    month: getRightTimeFormat(m),
    day: getRightTimeFormat(d),
    hour: getRightTimeFormat(h),
    minute: getRightTimeFormat(min),
    second: getRightTimeFormat(s),
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
      return model.update(data)
    }
    return model.create(data)
  }
}

module.exports = {
  transTimeStamp,
  upsertWithModel,
}
