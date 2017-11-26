import Product from '@/containers/Base/Product'

export default {
  path: 'base',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'product', component: Product }
  ]
}
