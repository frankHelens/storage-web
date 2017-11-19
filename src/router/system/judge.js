import List from '@/containers/System/judge/List'
export default {
  path: 'judge',
  component: {
    template: '<router-view></router-view>'
  },
  redirect: '/system/judge/list',
  children: [
    { path: 'list', component: List }
  ]
}
