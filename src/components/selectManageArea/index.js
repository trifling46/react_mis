import React from "react"
import { Select} from 'antd';
import {connect} from 'dva'
import PropTypes  from 'prop-types'

const Option = Select.Option;
class SelectManageArea extends React.Component {
  constructor (props){
    super(props)
    this.state ={
      value:''
    }
  }
  static  getDerivedStateFromProps(nextProps, prevState){
    return {value:nextProps.value}
  }
  componentDidMount(){
    this.props.dispatch({
      type:'manageArea/fetchManageArea'
    })
  }
  handleChange=(value,option)=>{
    if(this.props.onChange){
      this.props.onChange(value)
    }
  }
  render () {
	return (
    <Select
      showSearch
      value={this.state.value}
      placeholder={this.props.placeholder}
      optionFilterProp="children"
      allowClear={this.props.allowClear}
      onChange={this.props.onChange}
    >
      {this.props.manageArea.data.map(item=>{
        return <Option key={item.value} value={item.value}>{item.label}</Option>
      })}
    </Select>
	)
  }
}
SelectManageArea.propTypes = {
  value:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
  onChange:PropTypes.func,
  allowClear:PropTypes.bool
}
SelectManageArea.defaultProps = {
  placeholder:'请选择',
  allowClear:true
}
export default connect(({manageArea})=>{return {manageArea}},null,null,{withRef:true})(SelectManageArea)
