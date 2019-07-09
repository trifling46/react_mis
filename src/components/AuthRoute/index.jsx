import React from "react"
import { connect } from 'dva';
import { passRouter } from '../../utils/tool'
import { Redirect } from 'dva/router';

export default  (WrappedComponent)=> {
  class AuthRoute extends React.Component {
    constructor (props){
      super(props)
    }
    componentWillMount(){
      console.log('withAuthRoute change')
    }
    render () {
      let roles = JSON.parse(sessionStorage.getItem('roles'))
      let auth = passRouter(roles[this.props.location.pathname],this.props.user.user.permissions)
      return (
         auth ? <WrappedComponent {...this.props}/> : <Redirect to="/403" />
      )
    }
  }
  return connect(({user})=>{return {user}})(AuthRoute)
}

