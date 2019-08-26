import React from "react"
import WithCacheRoute from "../../../components/CacheRoute"

@WithCacheRoute('todoList')
class TodoList extends React.Component {
  constructor(props){
    super(props)
    console.log('constructor todoList')
  }
  render () {
    console.log('render todoList')
	return (
		<div>
      <input type="text"/>
    </div>
	)
  }
}
export default TodoList
