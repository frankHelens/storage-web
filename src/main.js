import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// import './assets/my-theme/dist/iview.css'
import './assets/css/custom.css'

import {
  Pagination,
  Dialog,
  Input,
  InputNumber,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  // DatePicker,
  Tooltip,
  Form,
  FormItem,
  Tree,
  Alert,
  Slider,
  Icon,
  Loading,
  MessageBox,
  Message,
  Row,
  Col,
  Checkbox,
  Upload
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
// Vue.use(DatePicker)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Loading.directive)

Vue.prototype.$ELEMENT = { size: 'small' }
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

// import 'babel-polyfill'
// import echarts from 'echarts/lib/echarts'
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/legend'
Vue.use(iView)
Vue.use(VueRouter)
// Vue.use(ElementUI)

// const colorPalette = [
//   '#48b0f7',
//   '#f55753',
//   '#f8d053',
//   '#ff783c',
//   '#6d5cae',
//   '#10cfbd',
//   '#2bc164',
//   '#b1b3b5'
// ]
// echarts.registerTheme('vintage', {
//   color: colorPalette,
//   // backgroundColor: '#fef8ef',
//   graph: {
//     color: colorPalette
//   }
// })

// Vue.prototype.$echarts = echarts

// Vue.config.productionTip = false
const App = {
  template: '<router-view></router-view>'
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
