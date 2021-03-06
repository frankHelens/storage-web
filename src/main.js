import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/css/custom.css'
import moment from 'moment'
import { momentReset } from '@/utils/reset'
import api from './utils/api'

import {
  Pagination,
  Dialog,
  Input,
  InputNumber,
  Switch,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  Tooltip,
  Form,
  FormItem,
  Tree,
  Alert,
  Icon,
  Loading,
  MessageBox,
  Message,
  Row,
  Col,
  Checkbox,
  Upload,
  Popover,
  Cascader
} from 'element-ui'

Vue.use(Cascader)
Vue.use(Popover)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Loading.directive)

Vue.use(api)

Vue.prototype.$ELEMENT = { size: 'small' }
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

momentReset(moment)

Object.defineProperty(Vue.prototype, '$moment', { value: moment })
Vue.use(iView)
Vue.use(VueRouter)

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
