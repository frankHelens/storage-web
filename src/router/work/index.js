// import Watermeter from '@/containers/Work/Watermeter'
import warehouseIn from './warehouseIn'
import warehouseOut from './warehouseOut'
import warehouseBack from './warehouseBack'
import allocate from './allocate'

export default {
  path: 'work',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    // { path: 'watermeter', component: Watermeter },
    allocate,
    warehouseOut,
    warehouseBack,
    warehouseIn
  ]
}
