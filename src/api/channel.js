import request from '@/utils/request'

export const getChannelList = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels',
    params
  })
}

export const setChannelList = channels => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'PATCH',
    data: [channels]
  })
}

/**
 *  删除用户指定的频道
 */

export const delChannelList = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
