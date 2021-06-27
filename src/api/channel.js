import request from '@/utils/request'

export const getChannelList = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels',
    params
  })
}
