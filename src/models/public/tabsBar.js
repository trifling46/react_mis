/**
 * Created by Administrator on 2019-03-07.
 */
import {getRouteByPath,getIndexByRoutes,getRouteByKey} from '../../utils/tool'
import routes from  '../../router/routes'
export default {
  namespace: 'tabsBar',

  state: {
    menuOpenKeys:[],
    activeViewKey:'',
    visitedViews:[],
    defaultViews: [
      {
        path: '/welcome', // 路由路径   必须和routes中的对应
        title: '首页', // 展示的标题
        name: 'welcome', // tab对应的别名
        key: '-1', // 只为高效率渲染
        closable: false // welcome 页面不支持关闭
      }
    ]
  },

  subscriptions: {
    routePath({ dispatch, history }) {  // eslint-disable-line
      history.listen(({pathname})=>{
        let route =  getRouteByPath(routes,pathname)
        if(route){
          dispatch({
            type:'addVisitedView',
            payload: {
              path: route.path,
              title: route.title,
              name: route.title,
              key: route.key,
              parentKeys:route.parentKeys,
              cache:route.cache,
              closable: route.closable
            }
          });
          dispatch({
            type:'updateActiveViewKey',
            payload:route.key
          });
        }else if(pathname === '/'){
          history.push({
            pathname:'/page/belongToArea'
          })
        }else if(pathname !== '/404'){
          history.push({
            pathname:'/404'
          })
        }
      })
    },
  },

  effects: {
    *updateActiveViewKey({payload},{call,put,select}){// eslint-disable-line
      let visitedViews =  yield select(state => state.tabsBar.visitedViews)
      let route = getRouteByKey(visitedViews,payload )
      route.parentKeys = route.parentKeys instanceof Array ? route.parentKeys:[]
      let parentKeys = route.parentKeys.map(item => item )

      yield put({
        type:'updateActiveKey',
        payload:payload
      })
      yield put({
        type:'updateMenuOpenKeys',
        payload:parentKeys
      })
    },
    *updateOpenKeys({payload},{call,put,select}){// eslint-disable-line
      yield put({
        type:'updateMenuOpenKeys',
        payload:payload
      })
    },
    *addVisitedView({payload,payloadIndex},{call,put,select }){ // eslint-disable-line
      let visitedViews =  yield select(state => state.tabsBar.visitedViews)
      let index  = getIndexByRoutes(visitedViews,payload)
      if(index === -1){
        let newVisitedView = [...visitedViews]
        if(payloadIndex !==undefined){
          newVisitedView.splice(payloadIndex,0,payload)
        }else {
          newVisitedView.push(payload)
        }
        yield  put({
          type:'updateVisitedView',
          payload:newVisitedView
        })
      }
    },
    *delVisitedView({payload = []},{call,put,select}){ // eslint-disable-line
      let visitedViews =  yield select(state => state.tabsBar.visitedViews)
      let newVisitedViews = [...visitedViews]
      payload.forEach(item=>{
        let index = getIndexByRoutes(newVisitedViews,item)
        newVisitedViews.splice(index,1)
      })
      yield  put({
        type:'updateVisitedView',
        payload:newVisitedViews
      })
    }
  },

  reducers: {
    updateVisitedView(state, {payload}) {
      return { ...state, ...{visitedViews:payload} };
    },
    updateActiveKey(state,{payload}){
      return { ...state, ...{activeViewKey:payload}};
    },
    updateMenuOpenKeys(state, {payload}){
      return {...state, ...{menuOpenKeys:payload}}
    }
  },

};
