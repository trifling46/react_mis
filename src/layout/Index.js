import React from "react"
import './index.less'
import Header from './Header'
import SideBar from './SideBar'
import TabsBar from './TabsBar'
import routes from '../router/routes'
import { Route ,Switch} from 'dva/router'
import dynamic from 'dva/dynamic'
import {getApp} from '../config/constant'
import WithNProgress from '../components/progress/WithNProgress'
import {Spin} from 'antd'
import  {connect} from 'dva'


class Index extends React.Component {
  constructor (props) {
    super(props)
    let {twoRoutes,app} = this.getRoutes()
    this.state = {
      childrenRoutes : twoRoutes.map(item=>{
        return <Route path={item.path} component={dynamic({app, models: item.models, component: item.component})} key={item.key} />
      }),
    }
  }
  getRoutes(){
    let twoRoutes = []
    routes.forEach(item=>{
      if(item.children && item.children.length>0){
        twoRoutes = [...twoRoutes,...item.children]
      }
    })
    let app = getApp()
    return {twoRoutes,app}
  }
  render () {
	return (
      <div className="z-body">
          <Header />
          <div className="z-container">
            <SideBar className="z-side"/>
            <div className="z-content-box">
              <div className="z-tab"><TabsBar/></div>
              <div className="z-page">
                <Switch>
                  {this.state.childrenRoutes}
                </Switch>
              </div>
            </div>
          </div>
      </div>
	)
  }
}
export default WithNProgress(Index)
