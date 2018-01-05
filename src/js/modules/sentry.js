import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import config from '@/config'
import session from '@/session'
import events from 'pubsub-js'

const environment = process.env.NODE_ENV
const release = process.env.VERSION

if (environment !== 'dev') {
  Raven
    .config(config.sentry_dsn, {
      release,
      environment
    })
    .addPlugin(RavenVue, Vue)
    .install()
}

// const captureException = environment === 'dev'
//   ? console.warn
//   : (error, showReportDialog) => {
//     console.log(error)
//     Raven.captureException(error)
//     if (showReportDialog) {
//       Raven.showReportDialog()
//     }
//   }

// window.onerror = (msg, url, lineNo, columnNo, error) => {
//   console.log(arguments)
//   captureException(error, true)
// }

const captureException = (error) => {
  if (environment !== 'dev') {
    Raven.captureException(error)
  }
}

events.subscribe('login', () => {
  Raven.setUserContext({
    email: session.$user.email,
    id: session.$user.id,
    name: session.$user.full_name
  })
})

events.subscribe('logout', () => {
  Raven.setUserContext({
    email: null,
    id: null,
    name: null
  })
})

export default captureException
