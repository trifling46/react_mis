import React from "react"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {connect} from 'dva'
// WithNProgress 组件不能引入loading, 减少性能损耗
// 也可在 history.listen 做此层的逻辑

export default (WrappedComponent) =>{
  class progress extends React.Component {
    componentWillMount(){
      console.log('withNProgress componentWillMount')
      NProgress.configure({showSpinner:false,minimum: 0.8,trickleSpeed:200});
      NProgress.start({showSpinner:false})
      if(this.props.user.fullName.length === 0){
        this.props.dispatch({
          type:'user/fetchUser'
        })
      }
    }
    render () {
      let hasUserInfo = this.props.user.fullName.length>0 ? true:false
      if(hasUserInfo) { NProgress.done()}
      return (
        !hasUserInfo ? <div></div> : <WrappedComponent {...this.props}/>
      )
    }
  }
  return connect(({user})=>{return {user}})(progress)
}

