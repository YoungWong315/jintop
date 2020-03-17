import axios from 'axios'
import Interceptor from './interceptor'

const getBaseUrl = () => {
  return process.env.NODE_ENV === 'production'
    ? 'http://www.jintop.cn'
    : 'http://127.0.0.1:9999'
}

// 默认配置
const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 60000,
  maxContentLength: 10000,
  /*允许携带cookie*/
  withCredentials: true, // 表示跨域请求时是否需要使用凭证, 默认false
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// 为拦截器注入Vue实例(service中初始化)
axiosInstance.inject = Vue => {
  const interceptorInstance = new Interceptor(Vue)
  // 注入请求拦截
  axiosInstance.interceptors.request.use(
    interceptorInstance.requestSuccessFunc,
    interceptorInstance.requestFailFunc,
  )
  // 注入失败拦截
  axiosInstance.interceptors.response.use(
    interceptorInstance.responseSuccessFunc,
    interceptorInstance.responseFailFunc,
  )
}

export default axiosInstance
