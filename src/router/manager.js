import Account from '@/containers/Manager/Account'
import Role from '@/containers/Manager/Role'
import Dictionary from '@/containers/Manager/Dictionary'
import Menu from '@/containers/Manager/Menu'
import Department from '@/containers/Manager/Department'

export default {
  path: 'manager',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'account', component: Account },
    { path: 'role', component: Role },
    { path: 'menu', component: Menu },
    { path: 'dictionary', component: Dictionary },
    { path: 'department', component: Department }
  ]
}
