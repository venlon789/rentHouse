import request from '@/utils/request'
export const getroomDetailApi = (id) => {
  return request({
    url: `/houses/${id}`
  })
}
// 收藏
export const addCollectApi = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'POST'
  })
}

// 取消收藏
export const delCollectApi = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'DELETE'
  })
}

// 验证是否收藏
export const queryCollectApi = (id) => {
  return request({
    url: `/user/favorites/${id}`
  })
}
