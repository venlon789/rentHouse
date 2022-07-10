import request from '@/utils/request'
export const getMapApi = (id) => {
  return request({
    url: '/area/map',
    params: {
      id
    }
  })
}
