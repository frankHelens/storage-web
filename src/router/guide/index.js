import Info from '@/containers/Guide/Info'

export default {
  path: 'guide',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'info', component: Info }
  ]
}
