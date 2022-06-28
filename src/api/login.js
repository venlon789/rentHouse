import request from '@/utils/request'
export const loginApi = data => {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}
