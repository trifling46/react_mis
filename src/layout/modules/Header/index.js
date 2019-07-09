import React from "react"
import "./index.less"
import { connect } from 'dva';
import SvgIcon from '../../../components/SvgIcon'
class Header extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      collapsed: false,
      menuStatusIcon:'menu-left',
      menuWidth:'180px',
      menus:[]
    }
  }
  handlerToggleMenu = ()=>{
    let icon = this.state.menuStatusIcon === 'menu-left' ? 'menu-right':'menu-left'
    let menuWidth = this.state.menuWidth === '180px' ? '50px':'180px'
    this.setState({
      collapsed: !this.state.collapsed,
      menuStatusIcon:icon,
      menuWidth:menuWidth
    });
  }
  render () {
	return (
		<header className="z-header">
      <div className="menu-ctrl">
        <SvgIcon iconName={this.state.menuStatusIcon} iconClass="icon-menu-ctrl" onClick={this.handlerToggleMenu}></SvgIcon>
      </div>
      <div className="header-right">
        <SvgIcon iconName="user" iconClass="icon-user" style={{fontSize:'20px'}}/>
        <div className="vertical-line"></div>
        <SvgIcon iconName="exit" iconClass="icon-exit" style={{fontSize:'22px'}}/>
      </div>
    </header>
  	)
  }
}
export default  connect(({user})=>{return {user}})(Header)
