import unit from './unit'
import person from './person'

export default {
  path: 'warning',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    unit,
    person
  ]
}
