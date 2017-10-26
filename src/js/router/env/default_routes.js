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
    },
    component(resolve) {
      require(['@/views/account'], resolve)
    }
  },
  {
    name: 'Properties',
    path: '/properties',
    meta: {
      auth: ['superadmin', 'admin', 'manager']
    },
    component(resolve) {
      require(['@/views/properties'], resolve)
    }
  },
  {
    name: 'Property',
    path: '/properties/:id',
    meta: {
      auth: ['superadmin', 'admin', 'manager']
    },
    component(resolve) {
      require(['@/views/properties/view'], resolve)
    }
  },
  {
    name: 'Units',
    path: '/units',
    meta: {
      auth: ['superadmin', 'admin', 'manager']
    },
    component(resolve) {
      require(['@/views/units'], resolve)
    }
  },
  {
    name: 'Unit',
    path: '/units/:id',
    meta: {
      auth: ['superadmin', 'admin', 'manager']
    },
    component(resolve) {
      require(['@/views/units/view'], resolve)
    }
  },
  {
    name: 'Leases',
    path: '/leases',
    meta: {
      auth: ['admin', 'manager']
    },
    component(resolve) {
      require(['@/views/leases'], resolve)
    }
  },
  {
    name: 'Lease',
    path: '/leases/:id',
    meta: {
      auth: ['admin', 'manager']
    },
    component(resolve) {
      require(['@/views/leases/view'], resolve)
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
    name: 'Company',
    path: '/companies/:id',
    meta: {
      auth: ['superadmin']
    },
    component(resolve) {
      require(['@/views/companies/view'], resolve)
    }
  },
  {
    name: 'Company Managment',
    path: '/company',
    meta: {
      auth: ['admin']
    },
    component(resolve) {
      require(['@/views/company'], resolve)
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
    name: 'Superadmin',
    path: '/superadmins/:id',
    meta: {
      auth: ['superadmin']
    },
    component(resolve) {
      require(['@/views/superadmins/view'], resolve)
    }
  },
  {
    name: 'Admins',
    path: '/admins',
    meta: {
      auth: ['superadmin', 'admin']
    },
    component(resolve) {
      require(['@/views/admins'], resolve)
    }
  },
  {
    name: 'Admin',
    path: '/admins/:id',
    meta: {
      auth: ['superadmin', 'admin']
    },
    component(resolve) {
      require(['@/views/admins/view'], resolve)
    }
  },
  {
    name: 'Tenants',
    path: '/tenants',
    meta: {
      auth: ['superadmin', 'admin']
    },
    component(resolve) {
      require(['@/views/tenants'], resolve)
    }
  },
  {
    name: 'Tenant',
    path: '/tenants/:id',
    meta: {
      auth: ['superadmin', 'admin']
    },
    component(resolve) {
      require(['@/views/tenants/view'], resolve)
    }
  },
  {
    name: 'Webhook Subscriptions',
    path: '/webhooks',
    meta: {
      auth: ['superadmin']
    },
    component(resolve) {
      require(['@/views/webhooks/index'], resolve)
    }
  },
  {
    name: 'Transfers',
    path: '/transfers',
    meta: {
      auth: ['superadmin', 'admin', 'manager', 'tenant']
    },
    component(resolve) {
      require(['@/views/transfers'], resolve)
    }
  },
  {
    name: 'Transfer',
    path: '/transfers/:id',
    meta: {
      auth: ['superadmin', 'admin', 'manager', 'tenant']
    },
    component(resolve) {
      require(['@/views/transfers/view'], resolve)
    }
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

export { routes }
