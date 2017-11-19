import List from '@/containers/System/Other/List'
export default {
  path: 'other',
  component: {
    template: '<router-view></router-view>'
  },
  redirect: '/system/other/list',
  children: [
    { path: 'list', component: List }
    // { path: 'create', component: warehouseBackGuide, meta: { active: 0 } },
    // { path: 'update/:id', component: warehouseBackGuide, meta: { active: 1 } },
    // { path: 'detail/:id', component: warehouseBackGuide, meta: { active: 3 } }
  ]
}
