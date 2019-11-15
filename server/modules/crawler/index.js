const cheerio = require('cheerio')
const superagent = require('superagent');

class Crawler {
  constructor({ uri }) {
    this.url = uri
    this.options = { uri, transform: body => cheerio.load(body) }
  }
  async crawl () {
    return superagent.get(this.options)
      .then($ => $)
      .catch(err => console.log(err))
  }
  async request () {
    return superagent.get(this.url)
  }
  async load (html) {
    return cheerio.load(html)
  }
}

module.exports = Crawler
