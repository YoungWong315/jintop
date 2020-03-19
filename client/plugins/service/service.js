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
   * 用户名密码注册
   * @param {Object} bodyData = { username, psd }
   */
  register = bodyData => axios.post('/user/register', bodyData)
  /**
   * 用户名密码登录
   * @param {Object} bodyData = { username, psd }
   */
  login = bodyData => axios.post('/user/login', bodyData)
  /**
   * 查找所有的用户
   * TODO: 请求链接要改，不合规范
  */
  findAllUser = (page, size) =>
    axios.get(`/user/findAllUser?page=${page}&size=${size}`)

  /* crawlByLink = link => axios.post(`/crawler/crawl?link=${link}`)
  crawlMeizitu = () => axios.post(`/crawler/meizitu`) */
  /**
   * 保存问卷
   * @param {Object} bodyData
   * {
   *    question: {Array} 问卷问题数组 = { type: '', label: '', options: [{label: ''}] }
   *    title: {String} 问卷标题
   *    uid: {String} 用户id
   * }
   */
  saveQuestionnaire = (bodyData) => axios.post(`/question/questionnaire/save`, bodyData)
  /**
   * 查询问卷列表
   * @param {String} uid 用户ID
   */
  queryQuestionnaireByUid = (uid) => axios.get(`/question/questionnaire/list?uid=${uid}`)
}

export default {
  install (Vue) {
    axios.inject(Vue)
    Vue.prototype.$service = Service.getSingletonInstance()
  },
}
