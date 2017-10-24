import Vue from 'vue'
import Router from 'vue-router'

// import _ from 'lodash'
import { path } from 'ramda'

import { routes } from './routes'
import routeHook from './hooks'

Vue.use(Router)

const mode = process.env.NODE_ENV === 'cordova' ? 'hash' : 'history'
const scrollBehavior = (to, from, savedPosition) => {
  return { x: 0, y: 0 }
}

const router = new Router({
  mode,
  routes,
  scrollBehavior
})

router.goBack = () => {
  // const back = _.get(router.currentRoute, 'meta.back')
  const back = path(['meta', 'back'], router.currentRoute)
  if (typeof back === 'string') {
    router.push(back)
  } else if (typeof back === 'function') {
    back(router)
  }
}

router.beforeEach(routeHook)

export default router
