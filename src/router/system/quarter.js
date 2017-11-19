import List from '@/containers/System/Quarter/List'
import Guide from '@/containers/System/Quarter/Guide'
import Print from '@/containers/System/Quarter/Print'
import CommentEdit from '@/containers/System/Quarter/Comment/Edit'
import CommentView from '@/containers/System/Quarter/Comment/View'
import VisitEdit from '@/containers/System/Quarter/Visit/Edit'
import VisitView from '@/containers/System/Quarter/Visit/View'

export default {
  path: 'quarter',
  component: {
    template: '<router-view></router-view>'
  },
  redirect: '/system/quarter/list',
  children: [
    { path: 'list', component: List },
    { path: 'create/:statusId', component: Guide },
    { path: 'update/:statusId/:id', component: Guide },
    { path: 'print/:id', component: Print },
    { path: 'commentEdit/:id', component: CommentEdit },
    { path: 'commentView/:id', component: CommentView },
    { path: 'visitEdit/:id', component: VisitEdit },
    { path: 'visitView/:id', component: VisitView }
  ]
}
