import Account from '@/containers/System/Account'
import ChangePassword from '@/containers/System/ChangePassword'

export default {
  path: 'system',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'account', component: Account },
    { path: 'changePassword', component: ChangePassword }
  ]
}
