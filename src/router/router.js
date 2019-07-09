import React from 'react'
import { Router, Route, Switch ,routerRedux} from 'dva/router'
import dynamic from 'dva/dynamic'
import routes from '../router/routes'
import {LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

const { ConnectedRouter } = routerRedux;
function RouterConfig({ app,history }) {
  return (
    <LocaleProvider locale={zh_CN}>
    <ConnectedRouter history={history}>
      <Switch>
        {
          routes.map(item=>{
            return <Route  path={item.path} component={dynamic({app, models: item.models, component: item.component})} key={item.key}/>
          })
        }
      </Switch>
    </ConnectedRouter>
    </LocaleProvider>
  );
}
export default RouterConfig;
