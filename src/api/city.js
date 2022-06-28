import request from '@/utils/request'
export const getCityListApi = (num) => {
  return request({
    url: '/area/city',
    params: {
      level: num
    }
  })
}
