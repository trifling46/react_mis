import React from "react"
import './index.less'
import QueryCondition from './QueryCondition'
import List from './List'
class Index extends React.Component {
  constructor (props){
    super(props)
    this.listRef = React.createRef()
  }
  componentDidMount(){
    console.log(this.listRef.current.getWrappedInstance())
    console.log(this.form)
  }
  render () {
    console.log('belongToArea parent')
	return (
		<div className="z-content">
      <QueryCondition wrappedComponentRef={(form) => this.form = form}/>
      <List  ref={this.listRef}/>
    </div>
	)
  }
}
export default Index
