/**
 * Created by Administrator on 2019-03-07.
 */

/**
 * activeView 更新由redux管理
 */
import {getRouteByPath,getIndexByRoutes,getRouteByKey} from '../../utils/tool'
import { getRoutes} from "../../config/constant"
import {routerRedux} from 'dva/router'


export default {
  namespace: 'tabsBar',

  state: {
    activeViewKey: -1, // 激活的 菜单、tab
    visitedViews: [],  // 访问视图
    defaultViews: ['/welcome']  // 默认视图 通过默认path自动生成visitedViews
  },

  subscriptions: {
    routePath({dispatch, history}) {  // eslint-disable-line
      history.listen(({pathname}) => {
        let route = getRouteByPath(getRoutes(), pathname)
        if (route) {
          dispatch({
            type: 'addVisitedView',
            payload: {
              path: route.path,
              title: route.title,
              id: route.id,
              pId: route.pId,
              cache: route.cache,
              closable: route.closable
            }
          })
          dispatch({
            type: 'updateActiveViewKey',
            payload: route.id
          })
        }
      })
    },
  },

  effects: {
    * updateActiveViewKey({payload}, {call, put, select}) {// eslint-disable-line
      yield put({
        type: 'updateActiveKey',
        payload: payload
      })
    },
    * addDefaultView({payload}, {call, put, select}) { // eslint-disable-line
      let visitedViews = yield select(state => state.tabsBar.visitedViews)
      let newVisitedView = [...payload, ...visitedViews]
      yield  put({
        type: 'updateVisitedView',
        payload: newVisitedView
      })
    },
  /**
   * 新增 tab
   * @param payload
   * @param call
   * @param put
   * @param select
   * @returns {IterableIterator<*>}
   */* addVisitedView({payload}, {call, put, select}) { // eslint-disable-line
    let visitedViews = yield select(state => state.tabsBar.visitedViews)
    let index = getIndexByRoutes(visitedViews, payload)
    if (index === -1) {
      let newVisitedView = [...visitedViews]
      newVisitedView.push(payload)
      yield  put({
        type: 'updateVisitedView',
        payload: newVisitedView
      })
    }
  },
  /**
   * 删除 指定 tab
   * @param payload
   * @param call
   * @param put
   * @param select
   * @returns {IterableIterator<*>}
   */* delVisitedView({payload}, {call, put, select}) { // eslint-disable-line
    let visitedViews = yield select(state => state.tabsBar.visitedViews)
    let newVisitedViews = [...visitedViews]
    let index = getIndexByRoutes(newVisitedViews, payload)
    newVisitedViews.splice(index, 1)
    yield  put({
      type: 'updateVisitedView',
      payload: newVisitedViews
    })

    // 手动跳转路由 会自动激活相应的tab
    let activeViewKey = yield select(state => state.tabsBar.activeViewKey)
    let route = getRouteByKey(visitedViews,activeViewKey)
    let activeIndex = getIndexByRoutes(newVisitedViews, route)
    if(activeIndex>index){ // 激活元素在删除元素右侧
      activeViewKey = activeIndex -1
    }else if(activeIndex<index && activeIndex > -1){// 激活元素在删除元素左侧
      activeViewKey = activeViewKey
    }else { // 删除激活元素
      activeIndex = index === newVisitedViews.length ? index - 1 : index
    }
    yield put( routerRedux.push({pathname: newVisitedViews[activeIndex].path}))
  }
 },

  reducers: {
    updateVisitedView(state, {payload}) {
      return { ...state, ...{visitedViews:payload} };
    },
    updateActiveKey(state,{payload}){
      return { ...state, ...{activeViewKey:payload}};
    },
  },

}
