import React from "react"
import './sideBar.less'
import SvgIcon from '../components/svgIcon/SvgIcon'
import Menu from '../components/menu/Menu'
import Test from '../routes/Test'

class SideBar extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      collapsed: false,
      menuStatusIcon:'left',
      menuWidth:'180px',
      menus:[]
    }
  }

  handlerToggleMenu = ()=>{
    let icon = this.state.menuStatusIcon === 'left' ? 'right':'left'
    let menuWidth = this.state.menuWidth === '180px' ? '50px':'180px'
    this.setState({
      collapsed: !this.state.collapsed,
      menuStatusIcon:icon,
      menuWidth:menuWidth
    });
  }
  render () {
    return (
      <div className="z-menus" style={{width:this.state.menuWidth}}>
        <div className="z-menus-box" >
          <Menu  collapsed={this.state.collapsed} />
        </div>
        <div className="z-menus-ctrl" onClick={this.handlerToggleMenu}>
          <SvgIcon iconName={this.state.menuStatusIcon}/>
        </div>
      </div>
    )
  }
}
export default SideBar
