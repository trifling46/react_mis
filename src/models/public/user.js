import {getUserInfo} from '../../services/common'
export default {
  namespace: 'user',

  state: {
    user:{}
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    // WithNProgress 组件不能引入loading, 减少性能损耗
    *fetchUser({payload},{call,put}){ // eslint-disable-line
      let result = yield  call(getUserInfo)
      yield  put({
        type:'updateUser',
        payload:result.data
      })
    }
  },

  reducers: {
    updateUser(state, {payload}) {
      return { ...state, ...{user:payload} };
    },
  },

};
