import React from "react"
import './index.less'
import Header from './modules/Header'
import SideBar from './modules/SideBar'
import TabsBar from './modules/TabsBar'
import {buildRouteDom} from '../utils/routeDom'


class Layout extends React.Component {
  constructor (props) {
    super(props)
    console.log('constructor layout')
    this.state = {
      collapsed: false,
    }
    this.routes =  buildRouteDom(2)
    console.log(this.routes)
  }
  handlerToggleMenu = ()=>{
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render () {
    return (
        <div className="z-body">
            <SideBar collapsed={this.state.collapsed}/>
            <div className="z-container">
              <Header handlerToggleMenu={this.handlerToggleMenu} collapsed={this.state.collapsed}/>
              <div className="z-content-box">
                <div className="z-tab"><TabsBar/></div>
                <div className="z-page">
                  {this.routes}
                </div>
              </div>
            </div>
        </div>
    )
  }
}
export default Layout
