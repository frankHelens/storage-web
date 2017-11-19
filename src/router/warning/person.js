import List from '@/containers/Warning/Person/List'
import Detail from '@/containers/Warning/Person/Detail'

export default {
  path: 'person',
  component: {
    template: '<router-view></router-view>'
  },
  children: [{
    path: 'detail/:id', component: Detail
  }, {
    path: 'list', component: List
  }]
}

