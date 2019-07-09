import axios from 'axios'
import {message} from 'antd'
/*import '../mock'*/

/*let development = "/ops" //开发
let production = "https://base.zto.com/ops" //生产
let test = "http://10.9.36.118:8080/ops"   //测试*/
//http://10.10.134.45:8888
// 创建一个axios实例
const service = axios.create({
  //baseURL: '/api',//生产
	timeout: 5000, // 超时时间
	withCredentials: true, // 允许携带cookie
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
    'Accept':'application/json'
	}
})

// 请求发送处理
service.interceptors.request.use(config => {
	// 可以对用户权限进行请求进行拦截 Promise.reject(error)
	// 在发送请求做一些事情
	return config
}, error => {
	// 发送请求失败报错
	console.error('err' + error) // for debug
})

// 请求相应处理
service.interceptors.response.use(function(response) {
  let result = response.data
  if(result.statusCode === '302' && result.message.includes('oauth2/authorize')){
    window.location.href = result.message
  }else{
    if(result.status === false){
      message.error(result.errorMsg || result.message)
    }
    return response
  }
}, function(error) {
  message.error(error.message)
	// 响应异常的处理
	return Promise.reject(error)
})

export default service
