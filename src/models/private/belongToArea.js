import {getManageAreaData,updateManageArea,addManageArea} from '../../services/belongToArea'
import modelExtend from 'dva-model-extend'
import baseListModel from './baseListModel'
export default modelExtend(baseListModel,{
  namespace: 'belongToArea',

  state: {

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetchListData({payload},{call,put,select}){ // eslint-disable-line
      let belongToArea = yield select(state => state.belongToArea)
      let params = Object.assign({},belongToArea.queryCondition,belongToArea.paging)
      let result = yield  call(getManageAreaData,params)
      yield  put({
        type:'updateListData',
        payload:result.data.data
      })
      yield  put({
        type:'updatePaging',
        payload:{total:result.data.count}
      })
    },
    *updateManageArea({payload},{call,put}){ // eslint-disable-line
      return yield  call(updateManageArea,payload)
    },
    *addManageArea({payload},{call,put}){ // eslint-disable-line
      return  yield  call(addManageArea,payload)
    }
  },

  reducers: {
  },
})
