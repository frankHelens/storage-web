import EnterStock from '@/containers/Manage/EnterStock/List'
import EnterStockDetail from '@/containers/Manage/EnterStock/Detail'
import DeliveryStock from '@/containers/Manage/DeliveryStock/List'
import DeliveryStockDetail from '@/containers/Manage/DeliveryStock/Detail'

export default {
  path: 'manage',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'enterStock', component: EnterStock },
    { path: 'enterStockDetail', component: EnterStockDetail },
    { path: 'enterStockDetail/:id', component: EnterStockDetail },
    { path: 'deliveryStock', component: DeliveryStock },
    { path: 'deliveryStockDetail', component: DeliveryStockDetail },
    { path: 'deliveryStockDetail/:id', component: DeliveryStockDetail }
  ]
}
