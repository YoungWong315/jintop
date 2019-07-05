const env = process.env.NODE_ENV
const RPODCUTION = env === 'production'

class Interceptor {
  constructor(Vue) {
    this.vm = new Vue()
  }

  requestSuccessFunc = requestObj => {
    // 自定义请求拦截逻辑，可以处理权限，请求发送监控等
    // RPODCUTION ? "" : console.info("requestInterceptorFunc", `url: ${requestObj.url}`, requestObj);
    // 设置登录header ---> 此处代码会运行在服务端，所以访问不到localStorage
    if (!process.server) {
      requestObj.headers['Authorization'] = localStorage.getItem('token')
    }

    // aes加密传输数据
    if (requestObj.hasOwnProperty('data'))
      requestObj.data = this.vm.$crypto.encryptAES(requestObj.data)

    // 格式不可修改，否则后端无法拿到body
    requestObj.data = {
      data: requestObj.data,
    }
    return requestObj
  }

  requestFailFunc = requestError => {
    // 自定义发送请求失败逻辑，断网，请求发送监控等
    return Promise.reject(requestError)
  }

  responseSuccessFunc = responseObj => {
    RPODCUTION ? '' : console.info(responseObj)

    const resData = responseObj.data
    const { code } = resData

    switch (code) {
      case 1:
        // 业务成功
        return {
          data: resData.data,
          code: 1,
        }
      case 0:
        // 业务失败
        return {
          code: 0,
          err: resData.err,
        }
      case -1:
        console.log('登录失效')
        return {
          code: -1,
          err: resData.err,
        }
      default:
        // 业务中还会有一些特殊 code 逻辑，在这里做统一处理，也可以下方它们到业务层
        return Promise.reject(resData)
    }
  }

  responseFailFunc = responseError => {
    // 响应失败，可根据 responseError.message 和 responseError.response.status 来做监控处理
    return Promise.reject(responseError)
  }
}

export default Interceptor
