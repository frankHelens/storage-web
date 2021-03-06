import VueRouter from 'vue-router'

import { logout, loggedIn } from '@/utils/auth'
import Home from '@/containers/Home'
import Login from '@/containers/Login'
import NotFound from '@/containers/Common/NotFound'
import baseRoutes from './base'
import manageRoutes from './manage'
import Stat from '@/containers/Stat'
import systemRoutes from './system'

function requireAuth (to, from, next) {
  if (!loggedIn()) {
    next({
      path: '/login'
      // query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

const routes = [
  { path: '/',
    component: Home,
    children: [
      baseRoutes,
      manageRoutes,
      systemRoutes,
      { path: '/stat', component: Stat }
    ],
    redirect: '/base/product',
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
