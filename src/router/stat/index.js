import MainStatus from '@/containers/Stat/MainStatus'
import Score from '@/containers/Stat/Score'
import SuperStatus from '@/containers/Stat/SuperStatus'
import Person from '@/containers/Stat/Person'
import Warning from '@/containers/Stat/Warning'

// import Condition from '@/containers/Stat/Condition'
// import In from '@/containers/Stat/In'
// import Out from '@/containers/Stat/Out'
// import Back from '@/containers/Stat/Back'
// import Allocate from '@/containers/Stat/Allocate'

export default {
  path: 'stat',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    // { path: 'condition', component: Condition },
    // { path: 'in', component: In },
    // { path: 'out', component: Out },
    // { path: 'back', component: Back },
    // { path: 'allocate', component: Allocate },
    { path: 'mainStatus', component: MainStatus },
    { path: 'score', component: Score },
    { path: 'superStatus', component: SuperStatus },
    { path: 'person', component: Person },
    { path: 'warning', component: Warning }
  ]
}
