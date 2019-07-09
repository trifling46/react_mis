/**
 * Created by Administrator on 2019-03-06.
 */
let Mock = require('mockjs')
export const getUserInfo = () =>{
  return Mock.mock('/api/userInfo',{
    data: {
      'fullName': '@name',
      'depName':'用户体验部',
      'orgCode': 100,
      'permissions|5':[111,222,333]
    }, // 数据集
    status: true, // 数据状态
    statusCode: 'YS500', // 状态码
    message: '数据格式化有误！' // 提示信息
  })
}
// 直接js引入    拦截http请求 chrome 看不到
Mock.mock('/api/userInfo',{
  data: {
    'fullName': '@name',
    'depName':'用户体验部',
    'orgCode': 100,
    'permissions|5':[111,222,333]
  }, // 数据集
  status: true, // 数据状态
  statusCode: 'YS500', // 状态码
  message: '数据格式化有误！' // 提示信息
})
