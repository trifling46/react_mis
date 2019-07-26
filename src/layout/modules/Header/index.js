import React from "react"
import "./index.less"
import SvgIcon from '../../../components/SvgIcon'
import PropTypes  from 'prop-types'
class Header extends React.Component {
  constructor (props){
    super(props)
  }
  render () {
	return (
		<header className="z-header">
      <div className="menu-ctrl" onClick={this.props.handlerToggleMenu}>
        <SvgIcon iconName={this.props.collapsed ? 'menu-right':'menu-left'} iconClass="icon-menu-ctrl" ></SvgIcon>
      </div>
      <div className="header-right" >
        <SvgIcon iconName="user" iconClass="icon-user" style={{fontSize:'20px'}}/>
        <div className="vertical-line"></div>
        <SvgIcon iconName="exit" iconClass="icon-exit" style={{fontSize:'22px'}}/>
      </div>
    </header>
  	)
  }
}
Header.propTypes = {
  collapsed:PropTypes.bool,
  handlerToggleMenu:PropTypes.func
}
Header.defaultProps  = {
  collapsed:false,
}
export default  Header
