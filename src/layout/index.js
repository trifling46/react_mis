import React from "react"
import './index.less'
import Header from './modules/Header'
import SideBar from './modules/SideBar'
import TabsBar from './modules/TabsBar'
import {buildRouteDom} from '../utils/routeDom'
import {Provider} from "react-keep-alive"
import {connect} from 'dva'

class Layout extends React.Component {
  constructor (props) {
    super(props)
    console.log('constructor layout')
    this.state = {
      collapsed: false,
    }
    this.routes =  buildRouteDom(2)
  }
  handlerToggleMenu = ()=>{
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render () {
    console.log('render layout')
    return (
        <div className="z-body">
            <SideBar collapsed={this.state.collapsed}/>
            <div className="z-container">
              <Header handlerToggleMenu={this.handlerToggleMenu} collapsed={this.state.collapsed}/>
              <div className="z-content-box">
                <div className="z-tab"><TabsBar/></div>
                <Provider include={this.props.cacheViews}>
                  <div className="z-page">
                     {this.routes}
                  </div>
                </Provider>
              </div>
            </div>
        </div>
    )
  }
}
export default connect(({tabsBar})=>{return {cacheViews:tabsBar.cacheViews}})(Layout)
