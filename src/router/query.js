import Query from '@/containers/Query/List'
import Test from '@/containers/Query/Test'

export default {
  path: 'query',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'list', component: Query },
    { path: 'test', component: Test }
  ]
}
