/***
 * keepAlive 缓存原理，React.createPortal 一直缓存保留在实例外层DOM
 * provider  include 匹配成功则读取缓存组件，否则重绘当前组件
 */

import React from "react"
import {KeepAlive} from 'react-keep-alive'

export default  (componentName)=> {
  return (WrappedComponent)=>{
     return  class CacheRoute extends React.Component {
      constructor (props){
        super(props)
      }
      render () {
        return  <KeepAlive name={componentName} ><WrappedComponent {...this.props}/></KeepAlive>
      }
    }
  }
}

