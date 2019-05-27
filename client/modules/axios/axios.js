import axios from "axios";
import Interceptor from "./interceptor";

const env = process.env.NODE_ENV;

// 默认配置
const axiosInstance = axios.create({
  baseURL: env.VUE_APP_BASEURL,
  timeout: 20000,
  maxContentLength: 2000,
  /*允许携带cookie*/
  withCredentials: true, // 表示跨域请求时是否需要使用凭证, 默认false
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});

// 为拦截器注入Vue实例(service中初始化)
axiosInstance.inject = Vue => {
  const interceptorInstance = new Interceptor(Vue);
  // 注入请求拦截
  axiosInstance.interceptors.request.use(interceptorInstance.requestSuccessFunc, interceptorInstance.requestFailFunc);
  // 注入失败拦截
  axiosInstance.interceptors.response.use(
    interceptorInstance.responseSuccessFunc,
    interceptorInstance.responseFailFunc
  );
};

export default axiosInstance;
