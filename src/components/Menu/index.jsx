import React from "react"
import {Menu,Icon} from 'antd';
import {connect} from 'dva'
import './index.less'
import propTypes from 'prop-types'
import {getFlatRouteArr, getMenus} from '../../config/constant'
import {withRouter } from 'dva/router'

class Menus extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      defaultSelectedKeys: [],
      defaultOpenKeys: [],
      menus:getMenus(),
      childrenMenus:[],
      menuOpenKeys:[]
    }
    this.state.childrenMenus = this.getMenuTree(this.state.menus)
    console.log('constructor menu')
  }
  /**
   * 菜单 menu.item click
   * @param item
   * @param key
   * @param keyPath
   */
  handlerClickMenu = ({ item, key, keyPath })=>{
    this.props.history.push({
      pathname:item.props.path,
    })
  }
  /**
   * 菜单 menu.submenu click
   * @param key
   */
  handlerClickSubMenu=({ key})=>{
    let menuOpenKeys = [...this.state.menuOpenKeys]
    if(menuOpenKeys.includes(key)){
      menuOpenKeys.splice(menuOpenKeys.indexOf(key),1)
    }else{
      menuOpenKeys.push(key)
    }
    this.setState({
      menuOpenKeys:menuOpenKeys
    })
  }
  /**
   * 构建 菜单
   * @param menus
   * @returns {Array|*|Uint8Array | BigInt64Array | any[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array}
   */
  getMenuTree = (menus)=>{
    if(this.state.childrenMenus.length>0){
      return this.state.childrenMenus
    }else{
      return  menus.map(item=>{
        if(item.children && item.children.length>0){
          return <Menu.SubMenu onTitleClick={this.handlerClickSubMenu} title={<span><Icon type="mail" /><span>{item.title}</span></span>} key={item.id.toString()} >{this.getMenuTree(item.children)}</Menu.SubMenu>
        }else{
          return <Menu.Item key={item.id.toString()} title={item.title} path={item.path} ><Icon type="mail"/><span>{item.title}</span></Menu.Item>
        }
      })
    }
  }

  /**
   * 展开 activeViewKey  对应父级菜单
   * @param id
   */
  getMenuOpenKeys(id,menuPKeys){
    let flatRouteArr = getFlatRouteArr()
    for(let i=0;i<flatRouteArr.length;i++){
      if(flatRouteArr[i].id === id){
        let key = flatRouteArr[i].id.toString()
        if(!this.state.menuOpenKeys.includes(key)){
          menuPKeys.push(key)
        }
        if(flatRouteArr[i].pId !== 0){this.getMenuOpenKeys(flatRouteArr[i].pId,menuPKeys)}
      }
    }
  }
  render () {
    console.log('render menus')
    let menuPKeys = []
    this.getMenuOpenKeys(this.props.activeViewKey,menuPKeys)
    let menuOpenKeys = [...menuPKeys,...this.state.menuOpenKeys]
    // 收缩后的菜单 不能指定openKeys
    if(this.props.collapsed){
      return (
        <Menu
          selectedKeys={[this.props.activeViewKey.toString()]}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.props.collapsed}
          onClick={this.handlerClickMenu}
        >
          {this.state.childrenMenus}
        </Menu>
      )
    }else{
      return (
        <Menu
          selectedKeys={[this.props.activeViewKey.toString()]}
          openKeys={menuOpenKeys}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.props.collapsed}
          onClick={this.handlerClickMenu}
        >
          {this.state.childrenMenus}
        </Menu>
      )
    }
  }
}

Menu.propTypes = {
  menus: propTypes.array,
  collapsed: propTypes.bool
}
export default withRouter (connect(({tabsBar})=>{return {
  activeViewKey:tabsBar.activeViewKey
}})(Menus))
