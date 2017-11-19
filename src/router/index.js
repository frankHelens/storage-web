import VueRouter from 'vue-router'

import { logout } from '@/utils/auth'
import Home from '@/containers/Home'
import Login from '@/containers/Login'
import NotFound from '@/containers/Common/NotFound'
// import Query from '@/containers/Query'

// import taskRoutes from './task'
import queryRoutes from './query'
// import managerRoutes from './manager'
// import interactRoutes from './interact'
// import statRoutes from './stat'
// import configRoutes from './config'
// import guideRoutes from './guide'
// import fingcheckRoutes from './fingcheck'

// import systemRoutes from './system'
// import warningRoutes from './warning'
// import recordRoutes from './record'

function requireAuth (to, from, next) {
  next()
}

const routes = [
  { path: '/',
    component: Home,
    children: [
      queryRoutes
      // baseRoutes,
      // managerRoutes,
      // interactRoutes,
      // statRoutes,
      // configRoutes,
      // guideRoutes,
      // fingcheckRoutes
    ],
    redirect: '/query/list',
    beforeEnter: requireAuth
  },
  { path: '/login', component: Login },
  { path: '/logout',
    beforeEnter (to, from, next) {
      logout()
      next('/login')
    }
  },
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: routes
})

export default router
