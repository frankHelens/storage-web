import Stock from '@/containers/Storage/Stock'
import StockDetail from '@/containers/Storage/StockDetail'
import Storage from '@/containers/Storage/Storage'
import WarehouseOut from '@/containers/Storage/WarehouseOut'
import WarehouseIn from '@/containers/Storage/WarehouseIn'
import inventory from './inventory'

export default {
  path: 'storage',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'stock', component: Stock },
    { path: 'stock/:id', component: StockDetail },
    { path: 'storage', component: Storage },
    { path: 'warehouseOut', component: WarehouseOut },
    { path: 'warehouseIn', component: WarehouseIn },
    inventory
  ]
}
