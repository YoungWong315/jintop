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
   * @param {Object} questionnaireData
   * {
   *    question: {Array} 问卷问题数组 = { type: '', label: '', options: [{label: ''}] }
   *    title: {String} 问卷标题
   *    uid: {String} 用户id
   * }
   */
  saveQuestionnaire = questionnaireData =>
    axios.post(`/question/questionnaire/save`, questionnaireData)
  /**
   * 查询问卷列表
   * @param {String} uid 用户ID
   */
  queryQuestionnaireByUid = uid =>
    axios.get(`/question/questionnaire/list?uid=${uid}`)
  /**
   * 查询问卷详情
   * @param {String} questionnaireId
   */
  queryQuestionnaireDetail = questionnaireId =>
    axios.get(
      `/question/questionnaire/detail?questionnaireid=${questionnaireId}`,
    )
  /**
   * 删除问卷
   * @param {String} questionnaireId
   */
  deleteQuestionnaire = questionnaireId =>
    axios.post(
      `/question/questionnaire/delete?questionnaireid=${questionnaireId}`,
    )
  /**
   * 修改问卷
   * @param {Object} jsonBody 格式同保存问卷，不过需要带上 问卷id/题目id/选项id
   */
  modifyQuestionnaire = jsonBody =>
    axios.post('/question/questionnaire/modify', jsonBody)
  /**
   * 删除问题
   * @param {String} questionId问题id
   */
  deleteQuestion = questionId =>
    axios.post(`/question/question/delete?questionid=${questionId}`)
  /**
   * 删除选项
   * @param {String} optionId选项id
   */
  deleteOption = optionId =>
    axios.post(`/question/option/delete?optionid=${optionId}`)
  /**
   * 提交问卷结果
   * @param {String} userId 提交问卷人的用户id
   * @param {Object} questionnaireData 问卷信息
   */
  submitQuestionnaire = (userId, questionnaireData) =>
    axios.post(
      `/question/questionnaire/submit?userid=${userId}`,
      questionnaireData,
    )
  /**
   * 访问本地绝对路径目录，遍历目录上传文件到云存储
   * @param {Object} data = {
   *  path: '/lsdjlf/lsjfld'
   * } 问卷信息
   */
  submitPath = data => axios.post(`/readdir`, data)
  /**
   * 批量获取小程序码（根据渠道channel）
   * @param {Object} data = {
   *   path, appId, appSecret, page, scenes = []
   * }
   */
  getWxaCodeUnlimit = data => axios.post(`/wechat/getwxacodeunlimit`, data)
  /**
   * 批量获取小程序码（根据渠道channel）
   * @param {Object} data = {
   *   path, appId, appSecret, page, scenes = []
   * }
   */
  getWxaCodeLimit = data => axios.post(`/wechat/getwxacodelimit`, data)
}

const myService = Service.getSingletonInstance()

export default {
  install(Vue) {
    axios.inject(Vue)
    Vue.prototype.$service = myService
  },
  service: myService,
}
