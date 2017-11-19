import warehouseInList from '@/containers/Work/WarehouseIn/List'
import warehouseInGuide from '@/containers/Work/WarehouseIn/Guide'

export default {
  path: 'warehouseIn',
  component: {
    template: '<router-view></router-view>'
  },
  redirect: '/work/warehouseIn/list',
  children: [
    { path: 'list', component: warehouseInList },
    { path: 'create', component: warehouseInGuide, meta: { active: 0 } },
    { path: 'update/:id', component: warehouseInGuide, meta: { active: 1 } },
    { path: 'detail/:id', component: warehouseInGuide, meta: { active: 3 } }
  ]
}
