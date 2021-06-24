import axios from 'axios'
import store from '@/store/index'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn' //  接口基准路经
})

// 请求拦截
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (err) {
  return Promise.reject(err)
})
// 响应拦截
// token 等

export default request
