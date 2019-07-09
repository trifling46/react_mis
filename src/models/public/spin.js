/**
 * Created by Administrator on 2019-03-18.
 */
export default {
  namespace: 'spin',
  state: {
    loading:false
  },

  reducers: {
    updateStatus(state, {payload}) {
      return { ...state, ...{loading:payload} };
    },
  },

};
