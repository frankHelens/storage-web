import Danger from '@/containers/Interact/Danger'
import Inexpensive from '@/containers/Interact/Inexpensive'
import DangerDetail from '@/containers/Interact/DangerDetail'
import InexpensiveDetail from '@/containers/Interact/InexpensiveDetail'

export default {
  path: 'interact',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'danger', component: Danger },
    { path: 'inexpensive', component: Inexpensive },
    { path: 'dangerDetail/:id', component: DangerDetail },
    { path: 'inexpensiveDetail/:id', component: InexpensiveDetail }
  ]
}
