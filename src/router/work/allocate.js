import AllocateList from '@/containers/Work/Allocate/List'
import AllocateGuide from '@/containers/Work/Allocate/Guide'

export default {
  path: 'allocate',
  component: {
    template: '<router-view></router-view>'
  },
  redirect: '/work/allocate/list/in',
  children: [
    {
      path: 'list',
      component: {
        template: '<router-view></router-view>'
      },
      redirect: '/work/allocate/list/in',
      children: [
        { path: 'in', component: AllocateList, meta: {type: 'IN'} },
        { path: 'out', component: AllocateList, meta: {type: 'OUT'} }
      ]
    },
    { path: 'create', component: AllocateGuide, meta: { active: 0 } },
    { path: 'update/:id', component: AllocateGuide, meta: { active: 1 } },
    { path: 'confirm/:id', component: AllocateGuide, meta: { active: 2 } },
    { path: 'out/:id', component: AllocateGuide, meta: { active: 3 } },
    { path: 'in/:id', component: AllocateGuide, meta: { active: 4 } },
    { path: 'verify/:id', component: AllocateGuide, meta: { active: 5 } },
    { path: 'detail/:id', component: AllocateGuide, meta: { active: 7 } }
  ]
}
