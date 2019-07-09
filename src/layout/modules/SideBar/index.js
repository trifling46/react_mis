import React from "react"
import './index.less'
import Menu from '../../../components/Menu'
import PropTypes  from 'prop-types'

class SideBar extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      menuStatusIcon:'left',
      menuWidth:'180px',
      menus:[]
    }
  }

  render () {
    return (
      <div className="z-menus" style={{width:this.state.menuWidth}}>
        <div className="logo">
          <img src="/src/assets/layout/logo.png" alt="logo"/>
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
