import React from "react"
import {connect} from 'dva'
import {Form,Button ,Col,Row} from 'antd';
import SelectManageArea from '../../components/selectManageArea'
import SelectSite from '../../components/selectSite'

class QueryCondition extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      manageSiteName:''
    }
  }
  componentDidMount(){
    this.handleSearch()
  }
  handleSearch= ()=>{
    let payload = this.props.form.getFieldsValue()
    let params = Object.assign({},payload,this.state)
    this.props.dispatch({
      type:'belongToArea/updateQueryCondition',
      payload:params
    })
    this.props.dispatch({
      type:'belongToArea/fetchListData'
    })
  }
  handleReset=()=>{
    this.props.form.resetFields()
    this.setState({
      manageSiteName:''
    })
  }
  render () {
    console.log('belongToArea child')
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      },
    }
	return (
    <div className="z-query-condition">
      <Form {...formItemLayout} className="z-form-no-validate">
        <Row>
          <Col span={6}>
            <Form.Item
              label="管理区名称"
            >
              {getFieldDecorator('manageAreaCode')(
                <SelectManageArea/>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="对应管理网点"
            >
              {getFieldDecorator('manageSiteCode')(
                <SelectSite getExtraObj={(extraObj)=>this.setState({manageSiteName:extraObj.siteName})}/>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Button onClick={this.handleSearch} type='primary' className='z-query-btn'>查询</Button>
            <Button onClick={this.handleReset}  type='default' className='z-query-btn'>重置</Button>
          </Col>
        </Row>
      </Form>
    </div>
	 )
  }
}
export default connect(({belongToArea})=>{return {belongToArea}})(Form.create()(QueryCondition))
