/**
 * Created by Administrator on 2019-03-07.
 */
/**
 * 验证路由权限
 * @param roles
 * @param permissions
 * @returns {*|boolean}
 * @private
 */
 function passRouter(roles, permissions) {
  if(!roles || roles.length === 0){return true}
  let _pass = permissions.some(p => {
    for(let i=0;i<roles.length;i++){
      if(roles[i]===p){
        return true
      }
    }
    return false
  })
  return _pass
}
/**
 * 根据 path 查找对应路由表 ,只查询叶子节点
 * @param routes
 * @param path
 * @returns {*}
 */
function getRouteByPath (routes,path) {
  for(let i=0;i<routes.length;i++){
    let item = routes[i];
    if(item.children && item.children.constructor == Array && item.children.length>0){
      let result =  getRouteByPath(item.children,path);
      if(result){
        return result
      } else {
        continue
      }
    } else {
      if (item.path === path){
        return item;
      }
    }
  }
}
/**
 * 获取routes 中route下标
 * @param routes
 * @param route
 * @returns {number}
 */
function getIndexByRoutes (routes,route) {
  for(let i=0;i<routes.length;i++){
    if(routes[i].id === route.id){
      return i
    }
  }
  return -1
}
/**
 * 获取 route 根据key
 * @param routes
 * @param key
 * @returns {*}
 */
function getRouteByKey (routes,id) {
  for(let i=0;i<routes.length;i++){
    if(routes[i].id === id){
      return routes[i]
    }
  }
}
export {
  passRouter,
  getRouteByPath,
  getIndexByRoutes,
  getRouteByKey
}
