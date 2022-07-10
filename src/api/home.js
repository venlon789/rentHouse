import request from '@/utils/request'
export const slideShowPicApi = () => {
  return request({
    url: '/home/swiper'
  })
}
export const homeGroupsApi = (cityId) => {
  return request({
    url: '/home/groups',
    params: {
      area: cityId
    }
  })
}
