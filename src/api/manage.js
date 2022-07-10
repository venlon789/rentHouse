import request from '@/utils/request'
// 获取房屋查询条件
// 根据条件查询房屋
export const getUserManageHouseApi = () => {
  return request({
    url: '/user/houses'
  })
}
