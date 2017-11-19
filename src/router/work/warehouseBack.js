import warehouseBackList from '@/containers/Work/WarehouseBack/List'
import warehouseBackGuide from '@/containers/Work/WarehouseBack/Guide'
export default {
  path: 'warehouseBack',
  component: {
    template: '<router-view></router-view>'
  },
  redirect: '/work/warehouseBack/list',
  children: [
    { path: 'list', component: warehouseBackList },
    { path: 'create', component: warehouseBackGuide, meta: { active: 0 } },
    { path: 'update/:id', component: warehouseBackGuide, meta: { active: 1 } },
    { path: 'detail/:id', component: warehouseBackGuide, meta: { active: 3 } }
  ]
}
