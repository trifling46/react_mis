import React from "react"
import  "./header.less"
import { connect } from 'dva';
import SvgIcon from '../components/svgIcon/SvgIcon'
class Header extends React.Component {
  constructor (props){
    super(props)
  }
  render () {
	return (
		<header className="z-header">
      <div className="header-left logo">
        <img src="/src/assets/layout/logo.svg" alt="logo"/>
      </div>
      <div className="header-right">
        <SvgIcon iconName="user" iconClass="icon-user" style={{fontSize:'20px'}}/>
        <div className="vertical-line"></div>
        <SvgIcon iconName="exit" iconClass="icon-exit"style={{fontSize:'22px'}}/>
      </div>
    </header>
  	)
  }
}
export default  connect(({user})=>{return {user}})(Header)
