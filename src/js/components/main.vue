<template>
  <div class="app-container">
    <component :is="hoc_name" >
      <div v-if="logged_in" class="nav-container">

        <div :class="['logo-container', back_class]">
          <!-- <transition name="fade"> -->
            <button v-if="has_back" @click="$router.goBack" class="back-button">
              <icon-arrow-left />
            </button>
          <!-- </transition> -->
          <logo />
        </div>

        <navigation />
      </div>
      <main :class="[main_class]">
        <router-view></router-view>
      </main>
      <alert v-if="alert_visible" />
    </component>
  </div>
</template>

<script>
import { path } from 'ramda'
import { mapGetters } from 'vuex'
import Navigation from './nav'
import Alert from './alert'
import IconArrowLeft from './icons/arrow-left'

import Tenant from '@/components/roles/tenant'
import Admin from '@/components/roles/admin'

export default {
  name: 'app',
  computed: {
    main_class() {
      return this.logged_in
        ? 'content'
        : null
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
  watch: {
    logged_in(val) {
      let path = val ? this.getRedirect() : '/'
      return this.$router.replace(path)
    }
  },
  methods: {
    getRedirect() {
      return path(['query', 'redirect'], this.$route) || '/dashboard'
    }
  },
  components: {
    Navigation,
    Alert,
    IconArrowLeft,
    Tenant,
    Admin
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';
@import '~%/breakpoints';

$sidebar-width: 230px;

main {
  &.content {
    padding: 0 10px;
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
    margin-top: 16px;
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

@media (min-width: $breakpoint-medium) {

  .nav-container {
    position: fixed;
    width: $sidebar-width;
    top: 0;
    bottom: 0;
    background: $color-nav-background;

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
      padding: 20px;
    }
  }

  main {
    &.content {
      position: absolute;
      left: $sidebar-width;
      top: 0;
      bottom: 0;
      width: 1200px;
      max-width: calc(100% - #{$sidebar-width});
      padding: 30px;
      overflow-y: scroll;
      text-align: left;
    }
  }

}
</style>
