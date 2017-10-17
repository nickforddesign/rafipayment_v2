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
    name: 'Properties',
    path: '/properties',
    meta: {
      auth: true
      // auth: ['tenant']
    },
    component(resolve) {
      require(['@/views/properties'], resolve)
    }
  },
  {
    name: 'Leases',
    path: '/leases',
    meta: {
      auth: true
      // auth: ['tenant']
    },
    component(resolve) {
      require(['@/views/leases'], resolve)
    }
  },
  {
    name: 'Companies',
    path: '/companies',
    meta: {
      auth: ['superadmin']
    },
    component(resolve) {
      require(['@/views/companies'], resolve)
    }
  },
  {
    name: 'Superadmins',
    path: '/superadmins',
    meta: {
      auth: ['superadmin']
    },
    component(resolve) {
      require(['@/views/superadmins'], resolve)
    }
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

export { routes }
