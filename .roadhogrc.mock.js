import {getUserInfo} from './src/mock'
let Mock = require('mockjs')
import { format, delay } from 'roadhog-api-doc';

//真实node服务 chrome 控制台能看到实际请求
const proxy = {
  // 支持值为 Object 和 Array
  // GET POST 可省略
  'GET /api/userInfo':Mock.mock({
    data: {
      'fullName': '@name',
      'depName':'用户体验部',
      'orgCode': 100,
      'permissions':[111,222,333]
    }, // 数据集
    status: true, // 数据状态
    statusCode: 'YS500', // 状态码
    message: '请求成功！' // 提示信息
  }),
  'GET /api/menus':Mock.mock({
    data: {
      'menus':[
        {
          'id':'100',
          'name':'@name',
          'path':'@string',
          'children':[
            {
              'id':'200',
              'name':'@name',
              'path':'/page/test',
            },{
              'id':'201',
              'name':'@name',
              'path':'/page/user',
            }, {
              'id|':'205',
              'name':'@name',
              'path':'/page/belongToArea',
            }
          ]
        },
        {
          'id|':'101',
          'name':'@name',
          'path':'@string',
          'children':[
            {
              'id':'202',
              'name':'@name',
              'path':'/audit/record',
            },
          ]
        },
        {
          'id|':'102',
          'name':'@name',
          'path':'@string',
          'children':[
            {
              'id':'203',
              'name':'@name',
              'path':'/page/address',
            }
          ]
        }
      ]
    }, // 数据集
    status: true, // 数据状态
    statusCode: 'YS500', // 状态码
    message: '请求成功！' // 提示信息
  })
}

export default delay(proxy,10)
