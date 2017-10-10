import Login from '@/views/login'
// import Forgot from '@/views/forgot'
// import Reset from '@/views/reset'
import NotFound from '@/views/404'

const routes = [
  {
    path: '/',
    component: Login,
    meta: {
      auth: false
    }
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    meta: {
      auth: true
      // auth: ['tenant']
    },
    component(resolve) {
      require(['@/views/dashboard'], resolve)
    }
  },
  {
    name: 'Account',
    path: '/account',
    meta: {
      auth: true
      // auth: ['tenant']
    },
    component(resolve) {
      require(['@/views/account'], resolve)
    }
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

export { routes }
