const cheerio = require("cheerio");
const rp = require("request-promise");

const options = {
  uri: "http://www.youku.com",
  transform: body => cheerio.load(body)
};

rp(options)
  .then($ => {
    const selectArr = $(".navindex_left a");
    selectArr.each((i, elem) => {
      // 遍历的数据并不是可直接用的cheerio对象，要用$转换成cheerio对象才能调用cheerio对象的方法（类似jq）
      // console.log($(elem).attr("title"));
    });
  })
  .catch(err => {
    console.log(err);
  });
