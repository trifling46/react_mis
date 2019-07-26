/**
 * Created by Administrator on 2019-03-07.
 */
let app = {}  //dva 实例
let userInfo = {} // user 实例
let routes = {} // routes 有效路由 树  (有效：权限、hiddenRoue)
let menus = {} // routes 有效菜单 (有效：权限、hiddenMenu)
let flatRouteArr = [] // routes 原始路由 一维 (有效：权限)

function setApp (instance){
  app = instance
}
function getApp () {
  return app
}
function setUserInfo(user) {
  userInfo = user
}
function getUserInfo() {
  return userInfo
}
function setRoutes(validRoutes) {
  routes = validRoutes
}
function getRoutes() {
  return routes
}
function setMenus(validMenus) {
  menus = validMenus
}
function getMenus() {
  return menus
}
function setFlatRouteArr(routeArr) {
  return flatRouteArr = routeArr
}
function getFlatRouteArr() {
  return flatRouteArr
}

export {
  setApp,
  getApp,
  setUserInfo,
  getUserInfo,
  setRoutes,
  getRoutes,
  setMenus,
  getMenus,
  setFlatRouteArr,
  getFlatRouteArr
}
