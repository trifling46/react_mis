import dva from 'dva';
import './styles/reset.less';
import 'normalize.css/normalize.css' // 解决游览器之间的差异
import './styles/restAntd.less'
import './styles/common.less'
import './styles/fonts/iconfont'
import {setApp,getMenus} from './config/constant'
import {init} from './utils/init'
import models from './models/public'


init().then(res=>{
  // 1. Initialize
  const app = dva();
// 3. Model

  models.map(item=>{
    app.model(item)
  })
// 4. Router
  app.router(require('./router').default);

// 5. Start
  app.start('#root');

  setApp(app)
})

