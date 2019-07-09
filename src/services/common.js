/**
 * Created by Administrator on 2019-03-06.
 */
import http from '../utils/http'
import {localURL,opsURL} from '../config/baseURL'
// 用户信息
export const getUserInfo = params =>  http.get(`${localURL}/userInfo`).then(res => res.data)
// 菜单
export const getMenus = params =>  http.get(`${localURL}/menus`).then(res => res.data)
// 管理区
export const getAllManageAreaEnum = params => { return http.post(`${opsURL}/org/getAllManageAreaEnum`,params).then(res => res.data)}
// 网点
export const getSiteByKeyword = params => { return http.post(`${opsURL}/common/findOrganizeByKeyword`,params).then(res => res.data)}
