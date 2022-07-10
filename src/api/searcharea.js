import request from '@/utils/request'
export const getSearchAreaApi = (name, id) => {
  return request({
    url: '/area/community',
    params: {
      name,
      id
    }
  })
}
