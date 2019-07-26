import React from "react"
import {Tabs} from 'antd'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import {getRouteByKey, getRouteByPath} from '../../../utils/tool'
import {getFlatRouteArr, getRoutes} from "../../../config/constant";
const TabPane = Tabs.TabPane
class TabsBar extends React.Component {
  constructor (props) {
    super(props)
    let defaultViews = []
    // 构建默认视图
    this.props.defaultViews.forEach(path =>{
      if(path !== this.props.visitedViews[0].path){
        let route =  getRouteByPath(getRoutes(),path)
        defaultViews.push({
          path: route.path,
          title: route.title,
          id: route.id,
          pId: route.pId,
          cache: route.cache,
          closable: route.closable
        })
      }
    })
    this.props.dispatch({
      type:'tabsBar/addDefaultView',
      payload: defaultViews
    })
    console.log('constructor tabsBar')
  }

  /**
   * tab action
   * @param targetKey
   * @param action
   */
  onEdit = (targetKey, action) => {
    if (action === 'remove') {
      this.onRemoveTab(targetKey)
    }
  }
  /**
   * tab 点击 激活
   * @param activeKey
   */
  onChange = (activeKey) => {
    this.props.dispatch(routerRedux.push({
      pathname: getRouteByKey(getFlatRouteArr(), parseInt(activeKey)).path,
    }))
  }

  /**
   * 删除tab
   * @param targetKey
   */
  onRemoveTab (targetKey) {
    let route = getRouteByKey(this.props.visitedViews, parseInt(targetKey))
    this.props.dispatch({
      type: 'tabsBar/delVisitedView',
      payload: route
    })
  }

  render () {
    return (
      <Tabs
        hideAdd
        onChange={this.onChange}
        activeKey={this.props.activeViewKey.toString()}
        type="editable-card"
        onEdit={this.onEdit}
        tabBarStyle={{height: '40px'}}
      >
        {
          this.props.visitedViews.map(
          pane => <TabPane tab={pane.title} key={pane.id.toString()} closable={pane.closable}/>)
        }
      </Tabs>
    )
  }
}
export default connect(({tabsBar}) => {
  return {
    activeViewKey:tabsBar.activeViewKey,
    visitedViews:tabsBar.visitedViews,
    defaultViews:tabsBar.defaultViews
  }
})(TabsBar)
