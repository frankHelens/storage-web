import Account from '@/containers/System/Account'
import ChangePassword from '@/containers/System/ChangePassword'
import Menu from '@/containers/System/Menu'
import Role from '@/containers/System/Role'
import Config from '@/containers/System/Config'

export default {
  path: 'system',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'account', component: Account },
    { path: 'changePassword', component: ChangePassword },
    { path: 'menu', component: Menu },
    { path: 'role', component: Role },
    { path: 'config', component: Config }
  ]
}
