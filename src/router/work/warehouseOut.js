import warehouseOutList from '@/containers/Work/WarehouseOut/List'
import warehouseOutGuide from '@/containers/Work/WarehouseOut/Guide'

export default {
  path: 'warehouseOut',
  component: {
    template: '<router-view></router-view>'
  },
  redirect: '/work/warehouseOut/list',
  children: [
    { path: 'list', component: warehouseOutList },
    { path: 'create', component: warehouseOutGuide, meta: { active: 0 } },
    { path: 'update/:id', component: warehouseOutGuide, meta: { active: 1 } },
    { path: 'detail/:id', component: warehouseOutGuide, meta: { active: 3 } }
  ]
}
