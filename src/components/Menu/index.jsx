import React from "react"
import {Menu,Icon} from 'antd';
import {connect} from 'dva'
import './index.less'
import propTypes from 'prop-types'
import {getMenus} from '../../services/common'
import {routerRedux,withRouter } from 'dva/router'

class Menus extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      defaultSelectedKeys: [],
      defaultOpenKeys: [],
      menus:[],
      childrenMenus:[]
    }
  }
  componentWillMount(){
    getMenus().then(res =>{
      this.setState(()=> {return {menus:res.data.menus}})
    })
  }
  handlerClickMenu = ({ item, key, keyPath })=>{
    this.props.history .push({
      pathname:item.props.path,
    })
  }
  handlerClickSubMenu=(openKeys)=>{
    const latestOpenKey = openKeys.find(key => this.props.tabsBar.menuOpenKeys.indexOf(key) === -1)
    let    parentKeys = latestOpenKey ? [latestOpenKey] : []
    this.props.dispatch({
      type:'tabsBar/updateOpenKeys',
      payload:parentKeys
    });
  }
  getMenuTree = (menus)=>{
    if(this.state.childrenMenus.length>0){
      return this.state.childrenMenus
    }else{
      return  menus.map(item=>{
        if(item.children && item.children.length>0){
          return <Menu.SubMenu title={<span><Icon type="mail" /><span>{item.name}</span></span>} key={item.id} >{this.getMenuTree(item.children)}</Menu.SubMenu>
        }else{
          return <Menu.Item key={item.id} title={item.name} path={item.path} ><Icon type="mail"/><span>{item.name}</span></Menu.Item>
        }
      })
    }
  }
  render () {
    let tpl =  this.getMenuTree(this.state.menus)
    let openKeys = this.props.collapsed ? []: this.props.tabsBar.menuOpenKeys
    return (
        <Menu
          openKeys={openKeys}
          selectedKeys={[this.props.tabsBar.activeViewKey]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.props.collapsed}
          onClick={this.handlerClickMenu}
          onOpenChange={this.handlerClickSubMenu}
        >
          {tpl}
        </Menu>
    )
  }
}

Menu.propTypes = {
  menus: propTypes.array,
  collapsed: propTypes.bool
}
export default withRouter (connect(({tabsBar})=>{return {tabsBar}})(Menus))
