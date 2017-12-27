<template>
  <div class="nav">
    <div
      @click.prevent="toggle"
      :class="{ 'nav-toggle': true, 'active': nav_visible }">
      <div /><div /><div />
    </div>
    <nav
      :class="{ 'visible': nav_visible }"
      @click="close">
      <div class="scroll-y">

        <div class="user">
          <avatar :initials="$user.initials" :color="$user.avatar_color" />
          {{ $user.full_name }}
        </div>
        <component :is="$user.role" />
      </div>
    </nav>
    <v-touch
      v-if="nav_visible"
      class="overlay"
      @click="toggle"
      :options="{ touchAction: 'auto' }"
      @tap="toggle"
      @panright="toggle" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'
import superadmin from './roles/superadmin'
import admin from './roles/admin'
import manager from './roles/manager'
import tenant from './roles/tenant'

import avatar from '@/components/cards/avatar'

import { mapGetters } from 'vuex'

export default {
  name: 'nav',
  models: {
    user() {
      return session.$user
    }
  },
  computed: {
    ...mapGetters({
      nav_visible: 'app:nav_visible'
    })
  },
  watch: {
    nav_visible(val) {
      const method = val
        ? 'add'
        : 'remove'
      document.body.classList[method]('nav-visible')
    }
  },
  methods: {
    close() {
      this.$store.dispatch('nav_hide')
    },
    toggle() {
      this.$store.dispatch('nav_toggle')
    },
    onSwipeRight(e) {
      console.log(e)
    }
  },
  components: {
    superadmin,
    admin,
    manager,
    tenant,
    avatar
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
@import '~%/breakpoints';
@import '~%/colors';

$header-height: 72px;
$nav-width: 230px;

// mobile first

.app-container {
  transform: none;
  transition: 0.5s transform;
  
  main {
    filter: none;
    pointer-events: auto;
    transition: 0.5s filter;

    .content {
      pointer-events: auto;
    }
  }

  nav {
    box-shadow: none;
    transition: 0.5s box-shadow;
  }
}

.nav-visible {
  .app-container {
    transform: translateX(-#{$nav-width});
    transition: 0.5s transform;
    
    main {
      filter: blur(12px);
      pointer-events: none;
      transition: 0.5s filter;

      .content {
        pointer-events: none;
      }
    }

    nav {
      box-shadow: 0 -3px 30px rgba(34, 33, 62, 0.9);
      transition: 0.5s box-shadow;
    }
  }
}

.header-container {
  position: fixed;
  top: 0;
  height: $header-height;
  width: 100%;
  z-index: 900;
}

nav {
  position: fixed;
  top: 0;
  bottom: 0;
  width: $nav-width;
  left: 100%;
  z-index: 1000;
  text-align: left;
  color: $color-nav-text;
  background: $color-nav-background;
  background: linear-gradient(251deg, $color-nav-background 0%,#313147 100%);
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }

  .user {
    margin: 20px 0;
    text-align: center;

    .avatar {
      margin: 0 auto 14px;
    }
  }

  .divider {
    height: 1px;
    background: $color-grey-50;
  }

  ul {
    text-align: left;

    li {
      margin: 0;
    }
  }

  legend {
    padding: 10px 20px 0;
  }

  a {
    display: block;
    padding: 10px 20px;
    font-weight: bold;
    font-weight: normal;
    color: $color-nav-text;

    &:hover {
      text-decoration: none;
      background: rgba(255,255,255, 0.1);
    }

    &.router-link-active {
      background: rgba(255,255,255, 0.15);
      color: $color-highlight;

      &:hover {
        background: rgba(255,255,255, 0.2);
      }
    }
  }
}

.nav {
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
  }
}

.logo {
  width: 80px;
  margin-top: 10px;
}

@media (min-width: $breakpoint-small) {

  nav {
    a {
      text-align: left;
      text-transform: none;
    }

    &.router-link-active {
      background: rgba(255,255,255, 0.15);
      border-left: 3px solid $color-highlight;
      color: $color-highlight;

      &:hover {
        background: rgba(255,255,255, 0.2);
      }
    }
  }
}

.nav {
  .logo {
    display: inline-block;
    width: 180px;
  }
}

.nav-toggle {
  position: fixed;
  top: 20px;
  right: 14px;
  width: 36px;
  height: 36px;
  z-index: 9999;

  div {
    position: relative;
    top: 0;
    height: 3px;
    background-color: $color-text-light;
    margin: 7px 0;
    border-radius: 3px;
    transition: all .25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }

  &.active {
    div {
      transition: all .25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    div:nth-of-type(1) {
      top: 10px;
      transform: rotate(45deg);
    }

    div:nth-of-type(2) {
      opacity: 0;
    }

    div:nth-of-type(3) {
      top: -10px;
      transform: rotate(-45deg);
    }
  }
}

@media (min-width: $breakpoint-medium) {

  .app-container {
    transform: none;
  }

  .header-container {
    width: $nav-width;
  }

  .nav-visible {
    .app-container {
      transform: none;

      main {
        filter: none;
      }
    }
  }

  nav {
    display: block;
    position: relative;
    left: 0;
    height: 100vh;
    padding-top: 140px;
    background: $color-input-background;
    z-index: 99;

    .user {
      display: none;
    }
  }

  .nav-toggle {
    display: none;
  }

  .nav-container {
    height: 100%;
    bottom: 0;

    .logo {
      width: 100%;
    }
  }

  .nav {
    position: relative;

    .logo {
      display: none;
    }
  }
}
</style>
