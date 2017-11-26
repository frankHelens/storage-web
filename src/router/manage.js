import EnterStock from '@/containers/Manage/EnterStock/List'
import EnterStockDetail from '@/containers/Manage/EnterStock/Detail'

export default {
  path: 'manage',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'enterStock', component: EnterStock },
    { path: 'enterStockDetail', component: EnterStockDetail }
  ]
}
