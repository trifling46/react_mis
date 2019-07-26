import React from "react"
import propTypes from 'prop-types'
import './index.less'
import classNames from 'classnames'
class Index extends React.Component {
  render () {
    let iconName = `#icon-${this.props.iconName}`
    return (
        <svg className={classNames('icon',this.props.iconClass)} aria-hidden="true" style={this.props.style}>
          <use xlinkHref={iconName}></use>
         </svg>
     )
  }
}

Index.propTypes = {
  iconName:propTypes.string.isRequired,
  iconClass:propTypes.string
}
export default Index
