const cheerio = require('cheerio')
const superagent = require('superagent')
const phantom = require('phantom')

class Crawler {
  constructor(props = {}) {
    this.url = props.uri
    this.header = {
      // 'Host': props.uri, //带上这个会请求不同
      'user-agent': 'Baiduspider',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'cookie': 'Hm_lvt_dbc355aef238b6c32b43eacbbf161c3c=1575616400,1575617421;Hm_lpvt_dbc355aef238b6c32b43eacbbf161c3c=1575617430',
      'Referer': 'https://www.meizitu.com/'
    }
  }
  async phantomCrawl () {
    const instance = await phantom.create()
    const page = await instance.createPage()
    const status = await page.open(this.url)
    const content = await page.property('content')

    return this.cheerioLoad(content)
  }
  async cheerioCrawl () {
    const { text } = await superagent.get(this.url).set(this.header)
    return await this.cheerioLoad(text)
  }
  // return html text
  async request () {
    return superagent.get(this.url).set(this.header)
  }
  // return dom
  async cheerioLoad (html) {
    return cheerio.load(html)
    // return new JSDOM(html, { runScripts: dangerously ? 'dangerously' : undefined })
  }
}

module.exports = Crawler
