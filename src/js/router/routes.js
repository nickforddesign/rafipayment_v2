let routes = []
let env_routes

if (process.env.NODE_ENV === 'ui') {
  env_routes = require('./env/ui_routes')
} else {
  env_routes = require('./env/default_routes')
}

routes.push(...env_routes.routes)

export { routes }
