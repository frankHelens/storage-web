import Target from '@/containers/Duty/Target'
import Type from '@/containers/Duty/Type'
import Main from '@/containers/Duty/Main'
import Super from '@/containers/Duty/Super'

export default {
  path: 'duty',
  component: {
    template: '<router-view></router-view>'
  },
  children: [
    { path: 'target', component: Target },
    { path: 'type', component: Type },
    { path: 'main',
      component: Main,
      meta: {
        label: '党委主体',
        name: 'main'
      }
    },
    { path: 'super',
      component: Super,
      meta: {
        label: '纪委监督',
        name: 'super'
      }
    }
  ]
}
