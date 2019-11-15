// const cheerio = require('cheerio')
const superagent = require('superagent')
const { JSDOM } = require('jsdom')

class Crawler {
  constructor({ uri }) {
    this.url = uri
    // this.options = { uri, transform: body => cheerio.load(body) }
  }
  /* async crawl () {
    return superagent.get(this.options)
      .then($ => $)
      .catch(err => console.log(err))
  } */
  // return html text
  async request () {
    return superagent.get(this.url)
  }
  // return dom
  async load (html, dangerously = false) {
    // return cheerio.load(html)
    return new JSDOM(html, { runScripts: dangerously ? 'dangerously' : '' })
  }
}

module.exports = Crawler
