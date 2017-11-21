<template>
  <div id="iav-container"></div>
</template>

<script>
// import _ from 'lodash'
import { path } from 'ramda'
import config from '@/config'
import { load } from '@/utils'

let dwolla_js
let dwolla_loaded = false

export default {
  data() {
    return {
      iav_token: ''
    }
  },
  computed: {
    iav_token_endpoint() {
      return 'account/funding_sources/iav'
    }
  },
  async mounted() {
    if (!dwolla_loaded) {
      await load('https://cdn.dwolla.com/1/dwolla.js')
      dwolla_js = dwolla // eslint-disable-line no-undef
      dwolla_loaded = true
    }
    this.fetchIAVToken()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    fetchIAVToken() {
      return this.$request(this.iav_token_endpoint).then(response => {
        this.iav_token = response.token
        this.renderIAV()
      })
    },
    renderIAV() {
      dwolla_js.configure(config.dwolla_env)
      dwolla_js.iav.start(this.iav_token, {
        container: 'iav-container',
        stylesheets: [
          'https://fonts.googleapis.com/css?family=Roboto',
          'https://app.payment.rafiproperties.com/css/dwolla_style.css'
          // config.urls.base_url + 'css/dwolla_style.css'
        ],
        subscriber: this.iframeSubsciber,
        backButton: true,
        microDeposits: true,
        fallbackToMicroDeposits: true
      }, (error, response) => {
        // IAV successful
        if (response) {
          this.processDwollaResponse(response)
        //  IAV failed
        } else if (error) {
          console.warn(error)
        }
      })
      this.iframeListen()
    },
    iframeListen() {
      const $iframe = this.$el.querySelector('iframe')
      const iframe_onload = $iframe.onload

      $iframe.onload = () => {
        this.iframeLoaded()
        iframe_onload()
      }
    },
    iframeSubsciber(page) {
      if (page.error) {
        this.handleError(page.error)
      }
      this.$emit('change', page)
    },
    iframeLoaded() {
      this.$emit('load')
    },
    handleError(error) {
      this.$emit('error', error)
    },
    processDwollaResponse(response) {
      const funding_source = path(['_links', 'funding-source', 'href'], response).split('funding-sources/')[1]
      const body = {
        funding_source
      }
      return this.$request(this.iav_token_endpoint, {
        method: 'post',
        body
      })
      .then(async (data) => {
        this.$emit('complete', data)
      })
      .catch((error) => {
        this.$emit('error', error)
      })
    }
  }
}
</script>

<style scoped lang="scss">
#iav-container {
  iframe {
    width: 100%
  }
}
</style>
