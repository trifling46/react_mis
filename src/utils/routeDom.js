import {getApp, getRoutes} from "../config/constant";
import {Route,Redirect,Switch} from 'dva/router'
import React from "react"
import dynamic from 'dva/dynamic'
/**
 * 获取指定层级 routes
 * @type {Array}
 */
let levelRoutes = []
function getRoutesByLevel(routes,level) {
  for(let i=0;i<routes.length;i++){
    if(routes[i].level === level){
      levelRoutes.push(routes[i])
    }else if(routes[i].level < level && routes[i].children.length >0){
      getRoutesByLevel(routes[i].children,level)
    }else{
      continue
    }
  }
}
/**
 * 生成 路由dom
 * @param level
 */
function buildRouteDom(level=1) {
  let app = getApp()
  let routes = getRoutes()
  levelRoutes = []
  getRoutesByLevel(routes,level)
  // layout 一级路由 统一route出口
  if(level === 1){
    let route = {}
    let paths = []
    levelRoutes = levelRoutes.filter(item => {
      if(item.layout){
        paths.push(item.path)
        route = item
      }
      return !item.layout
    })
    route.path = paths
    levelRoutes.unshift(route)
  }
  let routeDom =  levelRoutes.map(item=>{
    return <Route  path={item.path} component={dynamic({app, models: item.models, component: item.component})} key={item.id}/>
  })
  // path  / 默认重定向 /welcome
  if(level === 1) {
    routeDom.push(<Redirect from='/' to='/welcome' key={-10} exact strict/>)
  }
  // 所有route 添加 404
  routeDom.push(<Redirect from='/*' to='/404' key={-11}/>)
  return (
    <Switch>
      {routeDom}
    </Switch>
  )
}
export {
  buildRouteDom
}
