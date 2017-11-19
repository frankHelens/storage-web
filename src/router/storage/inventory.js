import InventoryList from '@/containers/Storage/Inventory/List'
import InventoryGuide from '@/containers/Storage/Inventory/Guide'

export default {
  path: 'inventory',
  component: {
    template: '<router-view></router-view>'
  },
  redirect: '/storage/inventory/list',
  children: [
    { path: 'list', component: InventoryList },
    { path: 'create', component: InventoryGuide, meta: { active: 0 } },
    { path: 'inventory/:id', component: InventoryGuide, meta: { active: 1 } },
    { path: 'confirm/:id', component: InventoryGuide, meta: { active: 2 } },
    { path: 'detail/:id', component: InventoryGuide, meta: { active: 4 } }
  ]
}
