import Person from '@/containers/Record/Person'
import Unit from '@/containers/Record/Unit'
import Detail from '@/containers/Record/Detail/Guide'
import Base from '@/containers/Record/Base'
import UnitDetail from '@/containers/Record/UnitDetail'

export default {
  path: 'record',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'person', component: Person },
    { path: 'unit', component: Unit },
    { path: 'detail/:id', component: Detail },
    { path: 'base/:id', component: Base },
    { path: 'unitDetail/:id', component: UnitDetail }
  ]
}
