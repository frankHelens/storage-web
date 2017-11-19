import List from '@/containers/System/Web/List'
import Guide from '@/containers/System/Web/Guide'

export default {
  path: 'web',
  component: {
    template: '<router-view></router-view>'
  },
  redirect: '/system/web/list',
  children: [
    { path: 'list', component: List },
    { path: 'create/:statusId', component: Guide },
    { path: 'update/:statusId/:id', component: Guide }
  ]
}
