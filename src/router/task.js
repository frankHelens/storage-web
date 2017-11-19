import Audit from '@/containers/Task/Audit'
import Undone from '@/containers/Task/Undone'

export default {
  path: 'task',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'audit', component: Audit },
    { path: 'undone', component: Undone }
  ]
}

