import request from '@/utils/request'

// 登录接口
export const loginAPI = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 获取验证码接口
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

/**
 *  获取用户信息接口
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // 该接口需要请求头验证 token
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
