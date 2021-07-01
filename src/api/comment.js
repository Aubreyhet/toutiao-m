import request from '@/utils/request'

/**
 * 获取文章评论列表
 */

export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}

/**
 * 对评论点赞
 * @param {id} target
 * @returns
 */
export const likeToComment = target => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}

/**
 *  取消对评论点赞
 */
export const unlikeToComment = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`
  })
}

/**
 *  发布评论或者评论评论
 */

export const addComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
