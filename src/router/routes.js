/**
 * Created by Administrator on 2019-03-04.
 * 说明：
 * 1、同级路由可同时存在多个路由接受点route，从不同接受点  路由出去都会重新装载组件
 * 2、react-router 不存在父子路由（嵌套路由） 只要能匹配都能渲染，扁平化设计（vue-router 嵌套设计区别很大）
 * 3、为促使所有路由 都从同一路由点出去，需使所有路由含公共路由前缀（如：第一路由 都含 /page）
 */
let commonRoutes = [
  {
    path:'/403',
    component:()=>import('../pages/error/403'),
    key:'403'
  },{
    path:'',
    component:()=>import('../pages/error/404'),
    key:'404'
  }
]
let pageRoutes = [
  {
    path:'/audit',  // 此层级path 暂时未用到（可无）
    component:()=>import('../layout/Index'), // 此路由对应加载组件
    key:'101',
    children:[
      {
        path:'/audit/record', // 必须， 一级路由的渲染 来源也再此
        component:()=>import('../pages/Record'), // 此路由对应加载组件
        key:'202', // 左侧菜单 tab 之前关联
        parentKeys:['101'], // 父级keys, 用于菜单Menus openKeys
        title: '审计', // 标题
        cache: true, // 是否缓存
        closable: true, // 是否标签可关闭
        roles:['222','333'] // （route 标签没有类似vue-router meta 额外参数信息 ）
      }
    ]
  },
  {
    path:'/page',
    component:()=>import('../layout/Index'),
    key:'102',
    children:[
      {
        path:'/page/address',
        component:()=>import('../pages/Address'),
        key:'203',
        parentKeys:['102'],
        title: '地址',
        cache: true,
        closable: true,
      }
    ]
  },
  {
    path:'/page',
    component:()=>import('../layout/Index'),
    key:'100',
    children:[
      {
        path:'/page/test',
        component:()=>import('../pages/Test'),
        key:'200',
        parentKeys:['100'],
        title: '网点查询',
        cache: true,
        closable: true,

      },
      {
        path:'/page/user',
        component:()=>import('../pages/User'),
        key:'201',
        parentKeys:['100'],
        title: '用户信息',
        cache: true,
        closable: true,
      },
      {
        path:'/page/belongToArea',
        component:()=>import('../pages/belongToArea'),
        models:()=>[import('../models/private/belongToArea')],
        key:'205',
        parentKeys:['100'],
        title: '管理区配置',
        cache: true,
        closable: true,
      },

    ]
  },
  {
    path:'/welcome',
    component:()=>import('../layout/Index'),
    key:'666',
    children:[
      {
        path:'/welcome',
        component:()=>import('../pages/welcome/Welcome'),
        key:'-1',
        title: '首页',
        parentKeys:[],
        cache: true,
        closable: true,
      }
    ]
  },
]
let allRoutes = [...pageRoutes,...commonRoutes]
export default allRoutes

//models:()=>[import('../models/belongToArea')],
