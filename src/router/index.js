import React from 'react'
import { routerRedux,Switch,Route } from 'dva/router'
import {LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import {buildRouteDom} from '../utils/routeDom'

const { ConnectedRouter } = routerRedux;
let routes = buildRouteDom(1)
function RouterConfig({ app,history }) {
  return (
    <LocaleProvider locale={zh_CN}>
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
    </LocaleProvider>
  );
}
export default RouterConfig;
