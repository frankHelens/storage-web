import quarter from './quarter'
import web from './web'
import other from './other'
import judge from './judge'

export default {
  path: 'system',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    quarter,
    web,
    other,
    judge
  ]
}
