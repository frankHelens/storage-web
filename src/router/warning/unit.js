import List from '@/containers/Warning/Unit/List'
import Detail from '@/containers/Warning/Unit/Detail'

export default {
  path: 'unit',
  component: {
    template: '<router-view></router-view>'
  },
  children: [{
    path: 'detail/:id', component: Detail
  }, {
    path: 'list', component: List
  }]
}

