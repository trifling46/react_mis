import dva from 'dva';
import './styles/reset.less';
import 'normalize.css/normalize.css' // 解决游览器之间的差异
import './styles/restAntd.less'
import './styles/common.less'
import './styles/fonts/iconfont'
import createLoading from 'dva-loading';
import {setApp} from './config/constant'
import {init} from './utils/init'

init()
// 1. Initialize
const app = dva();

// 2. Plugins
 app.use(createLoading({
   global: false,
 }));

// 3. Model
 app.model(require('./models/public/user').default);
app.model(require('./models/public/manageArea').default);
app.model(require('./models/public/tabsBar').default);
app.model(require('./models/public/spin').default);
// 4. Router
app.router(require('./router/router').default);

// 5. Start
app.start('#root');

setApp(app)
