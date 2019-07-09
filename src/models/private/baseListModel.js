/**
 * Created by Administrator on 2019-03-14.
 * 基础List 列表 model
 */
import SysConfig from '../../config/system.conf'
export default {
  namespace: 'baseListModel',

  state: {
    list:[], // table 列表数据
    queryCondition:{},
    paging:{
      showTotal:(total, range) => `共${total} 条`,
      pageSizes:SysConfig.pagination.pageSizes,
      pageSize:SysConfig.pagination.pageSize,
      pageNum:0,
      total:0,
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  reducers: {
    updateListData(state, {payload}) {
      return { ...state, ...{list:payload} };
    },
    updatePaging(state, {payload}) {
      let paging = Object.assign({},state.paging,payload)
      return { ...state, ...{paging:paging} };
    },
    updateQueryCondition(state, {payload}) {
      return { ...state, ...{queryCondition:payload} };
    },
  },

};
