/**
 * 页面视图 路由
 * @type {*[]}
 */
let pageRoutes = [
  {
    path:'/welcome',
    component:()=>import('../../layout'),
    hiddenMenu:true,
    children:[
      {
        path:'/welcome',
        component:()=>import('../../pages/welcome/Welcome'),
        closable:false,
        hiddenMenu:true, // 默认 false
        title:'首页'
      }
    ]
  },
  {
    path:'/base',  // path 必须
    component:()=>import('../../layout'), // 此路由对应加载组件 必须
    title:'基础信息管理',// title 必须 hiddenMenu 为true 可不填
    hiddenMenu:true, // 默认 false
    layout:true,// 默认false
    children:[
      {
        path:'/base/siteSearch', // 必须， 一级路由的渲染 来源也再此  必须
        component:()=>import('../../pages/base/siteSearch'), // 此路由对应加载组件 必须
        title: '网点查询', // 标题 必须
        name:'siteSearch',
        cache: true, // 是否缓存
        closable: true, // 是否标签可关闭
        roles:['222','333'] // （route 标签没有类似vue-router meta 额外参数信息 ）
      }
    ]
  },
  {
    path:'/audit',
    component:()=>import('../../layout'),
    title:'审计',
    children:[
      {
        path:'/audit/modifyRecord',
        component:()=>import('../../pages/audit/modifyRecord'),
        title: '修改记录',
        cache: true,
        closable: true,
        roles:['444']
      },
    ]
  },
  {
    path:'/system',
    component:()=>import('../../layout'),
    title:'系统配置',
    children:[
      {
        path:'/system/formulaSet',
        title: '公式设置',
        hiddenRoute:true,
        children:[
          {
            path:'/system/formulaSet/transfer',
            component:()=>import('../../pages/system/formulaSet/transfer'),
            title: '中转部配置',
            cache: true,
            closable: true,
            roles:['444']
          },
        ]
      },
    ]
  },
  {
    path:'/approve',
    component:()=>import('../../layout'),
    title:'审批管理',
    children:[
      {
        path:'/approve/todoList',
        component:()=>import('../../pages/approve/todoList'),
        title: '代办事项',
        cache: true,
        name:'todoList',
        closable: true,
        roles:['111']
      },
      {
        path:'/approve/finishList',
        component:()=>import('../../pages/approve/finishList'),
        title: '已办事项',
        name:'finishList',
        cache: true,
        closable: true,
      },
    ]
  },
]
export default pageRoutes
