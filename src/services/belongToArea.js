/**
 * Created by Administrator on 2019-03-12.
 */
import http from '../utils/http'
import {opsURL} from '../config/baseURL'
//查询
export const getManageAreaData = params => { return http.post(`${opsURL}/systemFeeConfig/getManageArea`,params).then(res => res.data)}
//修改
export const updateManageArea = params => { return http.post(`${opsURL}/systemFeeConfig/updateManageArea`,params).then(res => res.data)}
//新增
export const addManageArea = params => { return http.post(`${opsURL}/systemFeeConfig/addManageArea`,params).then(res => res.data)}
