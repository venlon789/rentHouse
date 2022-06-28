import request from '@/utils/request'
export const getUseInfoApi = () => {
  return request({
    url: '/user'
  })
}
