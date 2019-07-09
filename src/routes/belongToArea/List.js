import React from "react"
import {connect} from  'dva'
import {Table,Button} from 'antd'
import EditRow from './EditRow'
class List extends React.Component {
  constructor (props){
    super(props)
    this.listRef = React.createRef()
    this.state = {
      columns : [
        {
          title: '操作',
          key: 'action',
          align:'center',
          fixed:'left',
          width:150,
          render: (text, record, index) => (
            <span>
               <span className="table-col-btn" onClick={event => this.handleEdit(record)}>编辑</span>
               <span className="table-col-btn"  onClick={this.handleDel.bind(record)}>删除</span>
            </span>
          ),
        },
        {
        title: '管理区编号',
        dataIndex: 'code',
        align:'center',
        width:120
      }, {
        title: '管理区名称',
        dataIndex: 'name',
        align:'center',
        width:250,
      }, {
        title: '住址',
        dataIndex: 'manageSiteName',
        align:'center',
        width:250,
      }, {
        title: '对应管理网点编号',
        dataIndex: 'manageSiteCode',
        align:'center',
          width:150,
      }, {
        title: '修改人',
        dataIndex: 'modifierName',
        align:'center',
          width:150,
      }, {
        title: '修改时间',
        dataIndex: 'gmtModified',
        align:'center',
          width:150,
      }, {
        title: '创建人',
        dataIndex: 'creatorName',
        align:'center',
          width:150,
      }, {
        title: '创建时间',
        dataIndex: 'gmtCreated',
        align:'center',
          width:150,
      }, {
        title: '备注',
        dataIndex: 'remark',
        align:'center',
      }],

      modalVisible:false,
      title:'新增',
      curData:{},
      initialValue : {
        code:'123',
        name:'test',
        manageSiteCode:'',
        manageSiteName:'',
        remark:'',
      }
    }
  }
  handleEdit=(row)=>{
    this.setState({
      modalVisible:true,
      curData:Object.assign({},row),
      title:'编辑',
      isEdit:true
    })
  }
  handleDel=(e,row)=>{
    console.log(row)
  }
  handleAdd=()=>{
    this.setState({
      modalVisible:true,
      curData:Object.assign({},this.state.initialValue),
      isEdit:false,
      title:'新增'
    })
  }
  handleCurrentChange=(page, pageSize)=>{
    this.props.dispatch({
      type:'belongToArea/updatePaging',
      payload:Object.assign({},this.props.belongToArea.paging,{pageNum:page})
    })
    this.getData()
  }
  handleSizeChange=(current, size)=>{
    this.props.dispatch({
      type:'belongToArea/updatePaging',
      payload:Object.assign({},this.props.belongToArea.paging,{pageSize:size,pageNum:1})
    })
    this.getData()
  }
  getData=()=>{
    this.props.dispatch({
      type:'belongToArea/fetchListData'
    })
  }
  componentDidMount(){
    this.scrollY = this.listRef.current.offsetHeight - 100
    window.resize = ()=>{
      this.scrollY = this.listRef.current.offsetHeight - 100
    }
      console.log('List componentDidMount')
  }
  render () {
    console.log('render List')
    let pagination = {
      current:this.props.belongToArea.paging.pageNum,
      pageSize:this.props.belongToArea.paging.pageSize,
      pageSizeOptions:this.props.belongToArea.paging.pageSizes,
      total:this.props.belongToArea.paging.total,
      showTotal:this.props.belongToArea.paging.showTotal,
      showQuickJumper:true,
      showSizeChanger:true,
      onChange:this.handleCurrentChange,
      onShowSizeChange:this.handleSizeChange
    }
    let loading = this.props.loading.effects['belongToArea/fetchListData']
	return (
		<div className="z-list-box" >
      <div className="z-btn-group">
        <Button type="primary" onClick={this.handleAdd}>新增</Button>
      </div>
      <div className="z-list" ref={this.listRef} >
          <Table columns={this.state.columns} dataSource={this.props.belongToArea.list} loading={loading}
                 rowKey="id" size="small" bordered pagination={pagination} scroll={{ x: 1500, y: this.scrollY }}/>
      </div>
      <EditRow isEdit={this.state.isEdit}  title={this.state.title} data={this.state.curData} visible={this.state.modalVisible} closeModal={()=>this.setState({modalVisible:false})} />
    </div>
	)
  }
}
export default connect(({belongToArea,loading})=>{return {belongToArea,loading}},null,null,{withRef:true})(List)
