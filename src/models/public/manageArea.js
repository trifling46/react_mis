/**
 * Created by Administrator on 2019-03-13.
 */
import {getAllManageAreaEnum} from '../../services/common'
export default {
  namespace: 'manageArea',

  state: {
    data:[]
  },

  effects: {
    *fetchManageArea({payload},{call,put,select}){ // eslint-disable-line
      let manageArea =  yield select(state => state.manageArea.data)
      if(manageArea.length === 0){
        let result = yield  call(getAllManageAreaEnum)
        let newArea = result.data.map(item=>{
          return {
            label:item.name,
            value:item.code
          }
        })
        yield  put({
          type:'updateManageArea',
          payload:newArea
        })
      }
    },
  },

  reducers: {
    updateManageArea(state, {payload}) {
      return { ...state, ...{data:payload} };
    },
  },

};
