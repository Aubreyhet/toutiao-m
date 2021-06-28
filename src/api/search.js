import request from '@/utils/request'

// 登录接口
export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取请求数据
 * @param {Object} params
 * @returns
 */
export const getSearchRes = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
