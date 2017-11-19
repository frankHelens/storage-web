import Case from '@/containers/Fingcheck/Case'

export default {
  path: 'Fingcheck',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'case', component: Case }
  ]
}
