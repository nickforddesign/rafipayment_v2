import Login from '@/views/login'
import Forgot from '@/views/forgot'
import Reset from '@/views/reset'
import NotFound from '@/views/404'

const routes = [
  {
    name: 'Login',
    path: '/',
    component: Login,
    meta: {
      auth: false
    }
  },
  {
    name: 'Forgot',
    path: '/forgot',
    component: Forgot,
    meta: {
      auth: false
    }
  },
  {
    name: 'Reset',
    path: '/reset',
    component: Reset,
    meta: {
      auth: false
    }
  },
  {
    name: 'Activation',
    path: '/activate',
    meta: {
      auth: false
    },
    component(resolve) {
      require(['@/views/activate'], resolve)
    }
  },
  {
    name: 'Confirm Email',
    path: '/confirm/email',
    component(resolve) {
      require(['@/views/confirm/email'], resolve)
    }
  },
  {
    name: 'Confirm Phone',
    path: '/confirm/phone',
    component(resolve) {
      require(['@/views/confirm/phone'], resolve)
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
    redirect: '/account/profile',
    component(resolve) {
      require(['@/views/account/'], resolve)
    },
    children: [
      {
        name: 'Profile',
        path: 'profile',
        meta: {
          auth: true
        },
        component(resolve) {
          require(['@/views/account/profile'], resolve)
        }
      },
      {
        name: 'Payment',
        path: 'payment',
        meta: {
          auth: true,
          back($router) {
            $router.back()
          }
        },
        component(resolve) {
          require(['@/views/account/payment'], resolve)
        }
      }
    ]
  },
  {
    name: 'Properties',
    path: '/properties',
    meta: {
      auth: ['superadmin', 'admin']
    },
    component(resolve) {
      require(['@/views/properties'], resolve)
    }
  },
  {
    name: 'Property',
    path: '/properties/:id',
    meta: {
      auth: ['superadmin', 'admin'],
      back($router) {
        $router.back()
      }
    },
    component(resolve) {
      require(['@/views/properties/view'], resolve)
    }
  },
  {
    name: 'Units',
    path: '/units',
    meta: {
      auth: ['superadmin', 'admin']
    },
    component(resolve) {
      require(['@/views/units'], resolve)
    }
  },
  {
    name: 'Unit',
    path: '/units/:id',
    meta: {
      auth: ['superadmin', 'admin'],
      back($router) {
        $router.back()
      }
    },
    component(resolve) {
      require(['@/views/units/view'], resolve)
    }
  },
  {
    name: 'Leases',
    path: '/leases',
    meta: {
      auth: ['admin', 'tenant']
    },
    component(resolve) {
      require(['@/views/leases'], resolve)
    }
  },
  {
    name: 'Lease',
    path: '/leases/:id',
    meta: {
      auth: ['admin', 'tenant'],
      back($router) {
        $router.back()
      }
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
      auth: ['superadmin'],
      back($router) {
        $router.back()
      }
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
      auth: ['superadmin'],
      back($router) {
        $router.back()
      }
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
      auth: ['superadmin', 'admin'],
      back($router) {
        $router.back()
      }
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
      auth: ['superadmin', 'admin'],
      back($router) {
        $router.back()
      }
    },
    component(resolve) {
      require(['@/views/tenants/view'], resolve)
    }
  },
  {
    name: 'Webhook Subscriptions',
    path: '/webhook-subscriptions',
    meta: {
      auth: ['superadmin']
    },
    component(resolve) {
      require(['@/views/webhook_subscriptions'], resolve)
    }
  },
  {
    name: 'Webhooks',
    path: '/webhooks',
    meta: {
      auth: ['superadmin']
    },
    component(resolve) {
      require(['@/views/webhooks'], resolve)
    }
  },
  {
    name: 'Transfers',
    path: '/transfers',
    meta: {
      auth: ['superadmin', 'admin', 'tenant']
    },
    component(resolve) {
      require(['@/views/transfers'], resolve)
    }
  },
  {
    name: 'Transfer',
    path: '/transfers/:id',
    meta: {
      auth: ['superadmin', 'admin', 'tenant'],
      back($router) {
        $router.back()
      }
    },
    component(resolve) {
      require(['@/views/transfers/view'], resolve)
    }
  },
  {
    name: 'Bills',
    path: '/bills',
    meta: {
      auth: ['superadmin', 'admin', 'tenant']
    },
    component(resolve) {
      require(['@/views/bills'], resolve)
    },
    children: [
      {
        name: 'Current Bills',
        path: 'current',
        meta: {
          auth: ['admin', 'tenant']
        },
        component(resolve) {
          require(['@/views/bills/current'], resolve)
        }
      },
      {
        name: 'Past Bills',
        path: 'past',
        meta: {
          auth: ['admin', 'tenant']
        },
        component(resolve) {
          require(['@/views/bills/past'], resolve)
        }
      }
    ]
  },
  {
    name: 'Bill',
    path: '/bills/:id',
    meta: {
      auth: ['superadmin', 'admin', 'tenant'],
      back($router) {
        $router.back()
      }
    },
    component(resolve) {
      require(['@/views/bills/view'], resolve)
    }
  },
  {
    name: 'Reports',
    path: '/reports',
    meta: {
      auth: ['admin'],
      back($router) {
        $router.back()
      }
    },
    component(resolve) {
      require(['@/views/reports'], resolve)
    }
  },
  {
    name: 'Rent Roll',
    path: '/rentroll',
    meta: {
      auth: ['admin'],
      back($router) {
        $router.back()
      }
    },
    component(resolve) {
      require(['@/views/rent_roll'], resolve)
    }
  },
  {
    name: 'Funding Source',
    path: '/funding_sources/:id',
    meta: {
      auth: ['superadmin', 'admin', 'tenant'],
      back($router) {
        $router.back()
      }
    },
    component(resolve) {
      require(['@/views/funding_sources/view'], resolve)
    }
  },
  {
    name: 'Events',
    path: '/events',
    meta: {
      auth: ['superadmin', 'admin']
    },
    children: [
      {
        name: 'Notifications',
        path: 'notifications',
        meta: {
          auth: ['superadmin', 'admin'],
          back($router) {
            $router.back()
          }
        },
        component(resolve) {
          require(['@/views/events/notification'], resolve)
        }
      },
      {
        name: 'Authentication',
        path: 'authentication',
        meta: {
          auth: ['superadmin', 'admin'],
          back($router) {
            $router.back()
          }
        },
        component(resolve) {
          require(['@/views/events/authentication'], resolve)
        }
      },
      {
        name: 'Webhook Events',
        path: 'webhooks',
        meta: {
          auth: ['superadmin', 'admin'],
          back($router) {
            $router.back()
          }
        },
        component(resolve) {
          require(['@/views/webhooks'], resolve)
        }
      }
    ],
    component(resolve) {
      require(['@/views/events'], resolve)
    }
  },
  {
    name: 'Event',
    path: '/events/:id',
    meta: {
      auth: ['superadmin', 'admin']
    },
    component(resolve) {
      require(['@/views/events/view'], resolve)
    }
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

export { routes }
