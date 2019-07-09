import React from "react"
import {Tabs} from 'antd'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import  {getRouteByKey, getIndexByRoutes} from '../utils/tool'
const TabPane = Tabs.TabPane
class TabsBar extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.props.tabsBar.defaultViews.forEach(item => {
      this.props.dispatch({
        type: 'tabsBar/addVisitedView',
        payload: item,
        payloadIndex: 0
      });
    })
  }

  onEdit = (targetKey, action) => {
    if (action === 'remove') {
      this.onRemoveTab(targetKey)
    }
  }
  onChange = (activeKey) => {
    this.props.dispatch(routerRedux.push({
      pathname: getRouteByKey(this.props.tabsBar.visitedViews, activeKey).path,
    }))
  }

  onRemoveTab (targetKey) {
    let route = getRouteByKey(this.props.tabsBar.visitedViews, targetKey)
    let index = getIndexByRoutes(this.props.tabsBar.visitedViews, route)
    this.props.dispatch({
      type: 'tabsBar/delVisitedView',
      payload: [route]
    }).then(res => {
      let activeIndex = index
      if (this.props.tabsBar.visitedViews.length <= index) {
        activeIndex -= 1
      }
      this.props.dispatch({
        type: 'tabsBar/updateActiveKey',
        payload: this.props.tabsBar.visitedViews[activeIndex].key
      })
      this.props.dispatch(routerRedux.push({
        pathname: this.props.tabsBar.visitedViews[activeIndex].path,
      }))
    });
  }

  render () {
    return (
      <Tabs
        hideAdd
        onChange={this.onChange}
        activeKey={this.props.tabsBar.activeViewKey}
        type="editable-card"
        onEdit={this.onEdit}
        tabBarStyle={{height: '40px'}}
      >
        {this.props.tabsBar.visitedViews.map(
          pane => <TabPane tab={pane.title} key={pane.key } closable={pane.closable}/>)}
      </Tabs>
    )
  }
}
export default connect(({tabsBar}) => {
  return {tabsBar}
})(TabsBar)
