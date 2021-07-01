import axios from 'axios'
import store from '@/store/index'
import JSONBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn', //  接口基准路经
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (error) {
      // console.log(error)
      return data
    }
  }]
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
