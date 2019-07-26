import React from "react"
import './index.less'
import Menu from '../../../components/Menu'
import PropTypes  from 'prop-types'

class SideBar extends React.Component {
  constructor (props){
    super(props)
  }

  render () {
    let menuWidth = this.props.collapsed ? '50px':'180px'
    let menuLogo = this.props.collapsed ? "/src/assets/layout/logo-min.png" : "/src/assets/layout/logo-max.png"
    return (
      <div className="z-menus" style={{width:menuWidth}}>
        <div className="logo">
          <img src={menuLogo} alt="logo"/>
        </div>
        <div className="z-menus-box" >
          <Menu  collapsed={this.props.collapsed} />
        </div>
      </div>
    )
  }
}
SideBar.propTypes = {
  collapsed:PropTypes.bool
}
SideBar.defaultProps = {
  collapsed: false
};
export default SideBar
