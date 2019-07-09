/**
 * Created by Administrator on 2019-03-07.
 */
import {getPermissionByRoute} from './tool'
import routes from '../router/routes'

function init () {
 let roles =  getPermissionByRoute(routes)
  sessionStorage.setItem('roles',JSON.stringify(roles))
}
export  {
  init
}
