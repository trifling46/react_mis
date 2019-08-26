/**
 * Created by Administrator on 2019-03-04.
 * 说明：
 * 1、同级路由可同时存在多个路由接受点route，从不同接受点  路由出去都会重新装载组件
 * 2、react-router 不存在父子路由（嵌套路由） 只要能匹配都能渲染，扁平化设计（vue-router 嵌套设计区别很大）
 * 3、为促使所有路由 都从同一路由点出去，需使所有路由含公共路由前缀（如：第一路由 都含 /page）
 */

/**
 * path        string          路由路径
 * name        string          组件名与路由名需同名（缓存组件必填项）
 * title       string          标题
 * component   function        路由组件 （layout为true 可不填）
 * layout      boolean         启用layout布局  默认true（true:一级路由 统一route 渲染 layout)
 * cache       boolean         是否缓存标签数据
 * closable    boolean         标签是否可关闭
 * hiddenMenu  boolean         路由是否隐藏在菜单栏上 默认false
 * hiddenRoute boolean         路由是否隐藏在路由表上 默认false
 * roles       array           路由需要的权限
 * @type {*[]}
 */

import pageRoutes from './page'
import commonRoutes from './common'

let allRoutes = [...pageRoutes,...commonRoutes]
export default allRoutes
