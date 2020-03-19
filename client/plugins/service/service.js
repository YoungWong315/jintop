import axios from '../../modules/axios/axios'

class Service {
  constructor() {
    this.instance = null
  }
  static getSingletonInstance = () => {
    if (!this.instance) {
      this.instance = new Service()
    }
    return this.instance
  }
  /**
   * @param {Object} bodyData
   * {
   *    
   * }
   */
  register = bodyData => axios.post('/user/register', bodyData)
  login = bodyData => axios.post('/user/login', bodyData)
  findAllUser = (page, size) =>
    axios.get(`/user/findAllUser?page=${page}&size=${size}`)

  /* crawlByLink = link => axios.post(`/crawler/crawl?link=${link}`)
  crawlMeizitu = () => axios.post(`/crawler/meizitu`) */
  saveQuestionnaire = (questions) => axios.post(`/question/questionnaire/save`, questions)
}

export default {
  install (Vue) {
    axios.inject(Vue)
    Vue.prototype.$service = Service.getSingletonInstance()
  },
}
