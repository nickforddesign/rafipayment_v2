// import _ from 'lodash'
import { path } from 'ramda'
import store from '@/store'
import hook_types from './hook_types'
// import session from '@/session'
// import { toggleStatusBar } from '@/utils'

export default async (to, from, next) => {
  try {
    const route_type = getRouteType(to)
    const is_authorized = checkPermissions(to, route_type)
    const config = hook_types[route_type]
    const options = config.options(to)
    handleRoute(is_authorized, next, options)
    // toggleStatusBar(config.statusbar)
    // closeNav()
  } catch (error) {
    console.warn(error)
  }
}

const getRouteType = (route) => {
  // const auth = _.get(route, 'meta.auth')
  const auth = path(['meta', 'auth'], route)
  let type
  if (auth === undefined) {
    type = 'all'
  } else if (auth === false) {
    type = 'public'
  } else if (auth === true) {
    type = 'private'
  } else if (auth instanceof Array) {
    type = 'roles'
  }
  return type
}

const checkPermissions = (route, type) => {
  // const auth = _.get(route, 'meta.auth')
  const auth = path(['meta', 'auth'], route)
  let is_authorized
  if (type === 'all') {
    is_authorized = true
  } else if (typeof auth === 'boolean') {
    // is_authorized = _.get(store, 'getters.session:logged_in') === auth
    is_authorized = path(['getters', 'session:logged_in'], store) === auth
  } else if (type === 'roles') {
    is_authorized = auth.includes(path(['getters', 'session:user', 'role'], store))
  }
  return is_authorized
}

const handleRoute = (is_authorized, next, options) => {
  const args = is_authorized
    ? undefined
    : options
  next(args)
}

// const closeNav = () => {
  // if (session.$store.getters.nav_visible) {
    // session.$store.dispatch('nav_hide')
  // }
// }
