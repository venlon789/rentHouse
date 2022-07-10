import request from '@/utils/request'
export const addRoomApi = () => {
  return request({
    url: '/houses/params'
  })
}
export const addPicApi = (data) => {
  return request({
    method: 'POST',
    url: '/houses/image',
    data
  })
}
export const addQuerenHouseApi = (data) => {
  return request({
    method: 'POST',
    url: '/user/houses',
    data
  })
}
