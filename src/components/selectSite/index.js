import React from "react"
import { AutoComplete } from 'antd'
import {getSiteByKeyword} from '../../services/common'
import PropTypes  from 'prop-types'
import { debounce ,throttle} from 'throttle-debounce'

const Option = AutoComplete.Option
class SelectSite extends React.Component {
  constructor (props){
    super(props)
    this.state= {
      options:[],
      value:props.value
    }
  }
  /*static  getDerivedStateFromProps(nextProps, prevState){
    return {...prevState,...{value:nextProps.value}}
  }*/
  componentWillMount(){
    this.debouncedGetData = debounce(300,this.getRemoteData)
    this.handleSearch(this.props.value)
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.value !== prevProps.value){
      this.handleSearch(this.props.value)
    }
  }
  handleSearch=(value)=>{
    if(value && value.trim().length > 0){
      this.debouncedGetData(value)
    }
  }
  getRemoteData(value){
    getSiteByKeyword({keyword:value}).then(res=>{
      let result = res.data ? res.data.slice(0,100) : []
      let options = result.map(item=>{
        return  <Option key={item.code} className="z-option" value={item.code} text={item.fullName} >
          <span>{item.fullName}</span> <em>{item.code}</em>
        </Option>
      })
      this.setState({
        options:options
      })
    })
  }
  handleChange=(value)=>{
    this.props.onChange(value)
    if(!value){
      this.props.getExtraObj({})
    }
  }
  handleSelect=(value,option)=>{
    this.props.getExtraObj({siteName:option.props.text})
  }
  render () {
	return (
    <AutoComplete
      value={this.state.value}
      placeholder={this.props.placeholder}
      onChange={this.handleChange}
      onSelect={this.handleSelect}
      allowClear={this.props.allowClear}
      optionLabelProp="text"
    >
      {this.state.options}
    </AutoComplete>
  )
  }
}
SelectSite.propTypes = {
  placeholder:PropTypes.string,
  allowClear:PropTypes.bool,
  onChange:PropTypes.func,
  getExtraObj:PropTypes.func
}
SelectSite.defaultProps = {
  placeholder:'请输入',
  allowClear:true,
  getExtraObj:()=>{}
}
export default SelectSite
