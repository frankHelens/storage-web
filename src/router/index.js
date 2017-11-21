import VueRouter from 'vue-router'

import { logout } from '@/utils/auth'
import Home from '@/containers/Home'
import Login from '@/containers/Login'
import NotFound from '@/containers/Common/NotFound'
// import product from '@/containers/product'

// import taskRoutes from './task'
import productRoutes from './product'
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
      productRoutes
      // baseRoutes,
      // managerRoutes,
      // interactRoutes,
      // statRoutes,
      // configRoutes,
      // guideRoutes,
      // fingcheckRoutes
    ],
    redirect: '/product/list',
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
