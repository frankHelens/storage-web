import Account from '@/containers/System/Account'
import ChangePassword from '@/containers/System/ChangePassword'
import Menu from '@/containers/System/Menu'

export default {
  path: 'system',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'account', component: Account },
    { path: 'changePassword', component: ChangePassword },
    { path: 'menu', component: Menu }
  ]
}
