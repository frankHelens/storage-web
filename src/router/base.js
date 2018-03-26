import Product from '@/containers/Base/Product'
import SafeList from '@/containers/Base/SafeList'

export default {
  path: 'base',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'product', component: Product },
    { path: 'safeList', component: SafeList }
  ]
}
