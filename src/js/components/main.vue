<template>
  <div class="app-container">
    <transition name="fade">
      <component :is="hoc_name" v-if="!requires_refresh">
        <div v-if="logged_in" class="header-container">

          <div class="title" v-if="logged_in">
            <h2>{{ $route.name }}</h2>
          </div>

          <div :class="['logo-container', back_class]">
            <button v-if="has_back" @click="$router.goBack" class="back-button">
              <icon-arrow-left />
            </button>
            <logo />
          </div>

        </div>
        <navigation v-if="logged_in" />

        <v-touch
          tag="main"
          :options="{ touchAction: 'auto' }"
          @panright="onSwipeRight"
          @panleft="onSwipeLeft">

          <div :class="[main_class]">
            <div class="container lg">
              <router-view></router-view>
            </div>
          </div>

        </v-touch>

        <alert v-if="alert_visible" />
        <portal-target name="modal" />
      </component>

      <deployment-message v-else />

    </transition>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { path } from 'ramda'
import { mapGetters } from 'vuex'
import Navigation from './nav'
import Alert from './alert'
import IconArrowLeft from './icons/arrow-left'
import config from '@/config'

import Superadmin from '@/components/roles/superadmin'
import Admin from '@/components/roles/admin'
import Tenant from '@/components/roles/tenant'
import None from '@/components/roles/none'

import DeploymentMessage from '@/views/deployment'

import { getPanStartPosition, toggleStatusBar } from '@/utils'

export default {
  name: 'app',
  data() {
    return {
      requires_refresh: false
    }
  },
  computed: {
    main_class() {
      return this.logged_in
        ? 'content'
        : 'public'
    },
    has_back() {
      return this.$route.meta.back
    },
    back_class() {
      if (this.has_back) {
        return 'back-visible'
      }
    },
    hoc_name() {
      return this.role || 'none'
    },
    ...mapGetters({
      logged_in: 'session:logged_in',
      role: 'session:role',
      alert_visible: 'app:alert_visible'
    })
  },
  mounted() {
    toggleStatusBar(this.logged_in)
    if (process.env.NODE_ENV !== 'cordova') {
      this.initSockets()
    }
  },
  watch: {
    logged_in(val) {
      toggleStatusBar(!!val)
      let path = val ? this.getRedirect() : '/'
      return this.$router.replace(path)
    }
  },
  methods: {
    getRedirect() {
      return path(['query', 'redirect'], this.$route) || '/dashboard'
    },
    onSwipeRight: debounce(function(e) {
      const start = getPanStartPosition(e)
      const angle = e.angle
      if (start.x < 50 && (angle > -20 && angle < 20)) {
        this.$router.goBack()
      }
    }, 20),
    onSwipeLeft: debounce(function(e) {
      const start = getPanStartPosition(e)
      const angle = e.angle
      const offset = (window.outerWidth || window.innerWidth) - start.x
      if (offset < 50 && (angle < -160 && angle > -180 || angle > 160 && angle < 180)) {
        this.$store.dispatch('nav_toggle')
      }
    }, 20),
    async initSockets() {
      if (!this.socket) {
        const engine = await import('engine.io-client')
        this.socket = engine(config.socket)

        this.socket.on('open', () => {
          console.log(`Connected to websockets server at ${config.socket}`)
          this.socket.on('message', message => {
            const data = JSON.parse(message)
            console.log(data)
            if (data.deployment && data.deployment.refresh) {
              this.requires_refresh = true
            }
          })
          this.socket.on('close', () => {
            console.log('Closed socket connection')
          })
        })
      }
    }
  },
  components: {
    Navigation,
    Alert,
    IconArrowLeft,
    Superadmin,
    Admin,
    Tenant,
    None,
    DeploymentMessage
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';
@import '~%/breakpoints';

$header-height: 72px;
$sidebar-width: 230px;

.app-container {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
}

main {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: $header-height;

  .content {
    padding: $header-height 10px 50px;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 10000;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    & > {
      .container {
        height: 100%;
      }
    }
  }

  .public {
    .container {
      width: 100%;
    }
  }
}

.logo-container {
  position: relative;
  width: 60px;
  height: 35px;
  margin: 6px;
  color: $color-text-default;

  .logo {
    position: absolute;
    z-index: 1;
  }
  .back-button {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    margin-top: 22px;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
    background: $color-background-dark;
    z-index: 2;
  }

  &.back-visible {
    .logo {
      opacity: 0;
      pointer-events: none;
    }
    .back-button {
      opacity: 1;
      pointer-events: all;
    }
  }
}

.vue-portal-target {
  position: relative;
  z-index: 9999999;
}

@media (min-width: $breakpoint-medium) {

  .header-container {
    position: fixed;
    width: $sidebar-width;
    top: 0;
    bottom: 0;
    background: transparent;

    .logo-container {
      width: 100%;
      height: auto;
      margin: 0;

      .back-button {
        display: none;
      }

      &.back-visible {
        .logo {
          opacity: 1;
        }
      }
    }

    .logo {
      position: relative;
      width: 100%;
      margin: 0;
      padding: 20px;
      background: $color-nav-desktop-background;
    }
  }

  main {
    user-select: auto !important;
    
    .content {
      position: absolute;
      left: $sidebar-width;
      top: 0;
      bottom: 0;
      max-width: calc(100% - #{$sidebar-width});
      margin: 0;
      padding: 30px;
      overflow-y: scroll;
      text-align: left;
    }
  }

}
</style>
