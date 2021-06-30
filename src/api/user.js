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

/**
 *  获取用户频道列表
 *  /app/v1_0/user/channels
 */
export const getUserChannels = () => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}

/**
 * 关注用户接口
 */

export const addFollow = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}

/**
 * 取消关注用户
 */
export const delFollow = target => {
  return request({
    method: 'DELETE',
    url: ` /app/v1_0/user/followings/${target}`
  })
}
