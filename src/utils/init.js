/**
 * Created by Administrator on 2019-03-07.
 */
import {setFlatRouteArr, setMenus, setRoutes, setUserInfo} from '../config/constant'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getUserInfo} from '../services/common'
import {passRouter} from "./tool";
import routes from "../router/routes";

let routeId = 0 // 路由Id
let routeArr = [] // 所有 有效路由数组
let permissions = [] // 所有 权限点

/**
 * 构建路由表、菜单树 生成层级level
 * @param tree
 * @param level
 */
function buildLevelByRoute(tree,level = 0) {
  for (const v of tree) {
    let curLevel = level + 1
     v.level = curLevel
    if (v.children && v.children.length > 0) {
      buildLevelByRoute(v.children, curLevel)
    }
  }
}
/**
 * 整理所有的路由 prop
 * @param routes
 * @param pId
 * @param level
 */
function preRouteArr(routes, pId,level) {
  for (const v of routes) {
    if(!passRouter(v.roles,permissions)){
      continue
    }
    let curLevel = level + 1
    routeId++
    routeArr.push({
      id: routeId,
      pId: pId,
      path:v.path,
      title: v.title,
      name:v.name,
      roles: v.roles,
      hiddenMenu: typeof v.hiddenMenu === 'boolean' ? v.hiddenMenu:false,
      hiddenRoute:typeof v.hiddenRoute === 'boolean' ? v.hiddenRoute:false,
      component:v.component,
      cache:v.cache,
      closable:v.closable,
      layout:typeof v.layout === 'boolean' ? v.layout:true,
      models:v.models,
      children: [],
      level:curLevel,
      isLeaf: !(v.children && v.children.length > 0)
    })
    if (v.children && v.children.length > 0) {
      preRouteArr(v.children, routeId,curLevel)
    }
  }
}

/**
 * 验证 有效菜单
 * @param route
 * @returns {boolean}
 */
function validMenu(route) {
  if(route.hiddenMenu) {
     return false
  }
  if(!route.isLeaf){
    return  routeArr.some(item=>{
      return item.pId === route.id
    })
  }
  return  true
}

/***
 * 构建 有效路由 菜单
 * @param children
 * @param pId
 */
function buildRouteAndMenus(validMenus,validRoutes,pId) {
  for(let i=0;i<routeArr.length;i++){
    if(routeArr[i].pId === pId){
      if(!routeArr[i].hiddenRoute)validRoutes.push(routeArr[i]) // 添加路由
      if(validMenu(routeArr[i])){
        validMenus.push({
        path:routeArr[i].path,
        title:routeArr[i].title,
        id:routeArr[i].id,
        pId:routeArr[i].pId,
        children:[]
      })}  // 添加菜单
      if(!routeArr[i].isLeaf){
        let curMenu = routeArr[i].hiddenMenu ? validMenus : validMenus[validMenus.length-1].children
        let curRoute = routeArr[i].hiddenRoute ? validRoutes : validRoutes[validRoutes.length-1].children
        buildRouteAndMenus(curMenu,curRoute,routeArr[i].id)
      }
    }
  }
}

/**
 * 初始化 菜单与路由
 */
function initRouteAndMenus() {
  preRouteArr(routes,0,0)
  let validMenus = []
  let validRoutes = []
  buildRouteAndMenus(validMenus,validRoutes,0)
  buildLevelByRoute(validRoutes)
  setMenus(validMenus)
  setRoutes(validRoutes)
  setFlatRouteArr(routeArr)
}

/**
 * 获取用户信息 初始化
 * @returns {Promise<T | never>}
 */
function init () {
  NProgress.configure({showSpinner:false,minimum: 0.8,trickleSpeed:200});
  NProgress.start({showSpinner:false})
  return getUserInfo().then(res=>{
    setUserInfo(res.data)
    permissions = res.data.permissions ? res.data.permissions:[]
    initRouteAndMenus()
    NProgress.done()
  })
}

export  {
  init
}
