import React from "react"
import { Modal, Button ,Form ,Col,Row,Input,message} from 'antd';
import PropTypes  from '_prop-types@15.7.2@prop-types'
import SelectSite from '../../../components/SelectSite'
import {debounce} from '_throttle-debounce@2.1.0@throttle-debounce'
import {connect} from '_dva@2.4.1@dva/index'
const { TextArea } = Input;
class EditRow extends React.Component {
  constructor (props){
    super(props)
  }
  componentDidMount(){
    this.debounceHandleOk = debounce(300,this.handleOk)
  }
  handleCancel=()=>{
    this.props.closeModal()
  }
  handleOk =()=>{
    this.props.form.validateFields((err, fieldsValue) => {
      if(!err){
        let params = Object.assign({},this.props.data,fieldsValue,this.state)
        let operateType = this.props.isEdit ? 'belongToArea/updateManageArea':'belongToArea/addManageArea'
        this.props.dispatch({
          type:operateType,
          payload:params
        }).then(res => {
          this.handleCancel()
          message.success('操作成功！')
          this.props.dispatch({
            type:'belongToArea/fetchListData'
          })
        })
      }
    })
  }
  handleReset=()=>{
    this.props.form.resetFields()
  }
  /**
   * 验证管理区 code
   */
  validateMangeAreaCode(rule, value, callback){
    if(!value || !value.toString().trim()){ callback();return}
    let reg = /^\d{4}$/
    if(reg.test(value)){
      callback();
    }else{
      callback(new Error('只能为数字且长度固定4位'));
    }
  }
  /**
   * 验证管理区 name
   */
  validateMangeAreaName(rule, value, callback){
    if(!value || !value.toString().trim()){ callback();return}
    if(value.toString().length<20){
      callback();
    }else{
      callback(new Error('长度最大限制20位'));
    }
  }
  render () {
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      },
    }
    const { getFieldDecorator } = this.props.form
    let currentValue =  this.props.data
    return (
    <Modal
      onOk={this.debounceHandleOk}
      onCancel={this.handleCancel}
      title={
          <div >{this.props.title}</div>
      }
      bodyStyle={{
        fontSize:500
      }}
      visible={this.props.visible}
      footer={
        <Row>
          <Button onClick={this.handleCancel}  type='default' className='z-query-btn'>取消</Button>
          <Button onClick={this.handleReset}  type='default' className='z-query-btn'>重置</Button>
          <Button onClick={this.debounceHandleOk} type='primary' className='z-query-btn' >提交</Button>
        </Row>
      }
    >
      <Form {...formItemLayout} >
        <Form.Item
          label="管理区编号"
        >
          {getFieldDecorator('code',{
            initialValue:currentValue.code,
            rules: [
              { required: true, message: '不能为空' },
              { validator:this.validateMangeAreaCode}]
          },)(
            <Input placeholder="请输入管理区编号" autoComplete="off"/>
          )}
        </Form.Item>
            <Form.Item
              label="管理区名称"
            >
              {getFieldDecorator('name',{
                initialValue:currentValue.name,
                rules: [
                  { required: true, message: '不能为空' },
                  { validator:this.validateMangeAreaName}]
              })(
                <Input placeholder="请输入管理区名称" autoComplete="off" id="areaName"/>
              )}
            </Form.Item>
            <Form.Item
              label="对应管理网点"
            >
              {getFieldDecorator('manageSiteCode',{
                initialValue:currentValue.manageSiteCode,
              })(
                <SelectSite getExtraObj={(extraObj)=>this.setState({manageSiteName:extraObj.siteName})}/>
              )}
            </Form.Item>
        <Form.Item
          label="备注"
        >
          {getFieldDecorator('remark',{
            initialValue:currentValue.remark,
          })(
            <TextArea placeholder="请输入备注" rows={4}/>
          )}
        </Form.Item>
        <div>{this.props.status}</div>
      </Form>
    </Modal>
	)
  }
}
EditRow.propTypes = {
  data:PropTypes.object,
  title:PropTypes.string,
  visible:PropTypes.bool,
  closeModal:PropTypes.func,
  isEdit:PropTypes.bool
}
EditRow.defaultProps = {
  data:{},
  title:'新增',
  visible:false,
  isEdit:false
}
export default connect(({loading})=>{return {loading}})(Form.create()(EditRow))
