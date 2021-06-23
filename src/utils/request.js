import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/' //  接口基准路经
})

// 请求拦截
// 响应拦截
// token 等

export default request
