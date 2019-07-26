let commonRoutes = [
  {
    path:'/403',
    component:()=>import('../../pages/error/403'),
    hiddenMenu:true, // 默认 false
    layout:false,// 默认 true
  },
  {
    path:'/404',
    component:()=>import('../../pages/error/404'),
    hiddenMenu:true, // 默认 false
    layout:false,// 默认 true
  }
]
export default commonRoutes
