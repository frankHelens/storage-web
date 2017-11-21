import Product from '@/containers/Product/List'

export default {
  path: 'product',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'list', component: Product }
  ]
}
