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

module.exports = {
  transTimeStamp,
}
