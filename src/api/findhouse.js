import request from '@/utils/request'
// 获取房屋查询条件

/**
 *
 * @param {这个数据可以从上面的定位来获取到地址} id
 * @returns
 */
export const slideShowPicApi = (id) => {
  return request({
    url: '/houses/condition',
    params: {
      id
    }
  })
}
// 根据条件查询房屋
export const queryHouseApi = (params) => {
  return request({
    url: '/houses',
    params
  })
}
