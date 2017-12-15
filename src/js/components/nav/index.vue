<template>
  <div class="nav">
    <a
      href="#"
      @click.prevent="toggle"
      :class="{ 'nav-toggle': true, 'active': nav_visible }">
      <div></div><div></div><div></div>
    </a>
    <nav
      :class="{ 'visible': nav_visible }"
      @click="close">
      <div class="scroll-y">
        <!-- <logo></logo> -->

        <div class="user">
          <avatar :initials="$user.initials" :color="$user.avatar_color" />
          {{ $user.full_name }}
        </div>
        <component :is="$user.role"></component>
      </div>
    </nav>
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
}

.nav-visible {
  .app-container {
    transform: translateX(-#{$nav-width});
    transition: 0.5s transform;
  }
}

.header-container {
  position: fixed;
  top: 0;
  height: $header-height;
  width: 100%;
  z-index: 900;
  background: $color-background-dark;
}

nav {
  // display: none;
  position: fixed;
  top: 0;
  // right: 0;
  bottom: 0;
  width: $nav-width;
  left: 100%;
  z-index: 2;
  text-align: left;
  color: $color-nav-text;
  background: $color-nav-background;
  overflow-y: scroll;
  // pointer-events: none;

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }

  .user {
    margin: 20px 0;
    text-align: center;

    .avatar {
      margin: 0 auto 14px;
      // display: inline-block;
    }
  }

  .divider {
    height: 1px;
    background: $color-grey-50;
  }

  // &.visible {
    // display: block;
    // pointer-events: auto;
  // }

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
    // padding: 26px 20px;
    padding: 18px 20px;
    font-weight: bold;
    text-transform: uppercase;
    color: $color-nav-text;
    border-bottom: 1px solid #666;

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
  .panel {
    width: 100%;
    text-align: center;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0px;
      background: transparent; /* make scrollbar transparent */
    }
  }
}

.logo {
  width: 80px;
  margin-top: 10px;
}

@media (min-width: $breakpoint-small) {

  nav {
    a {
      padding: 10px 20px;
      text-align: left;
      font-weight: normal;
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

  .panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
}

.panel.scroll-y {
  max-height: 100vh
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
    }
  }

  nav {
    display: block;
    position: relative;
    left: 0;
    height: 100vh;
    padding-top: 140px;
    background: $color-input-background;
    // bottom: 0;
    // top: 100px;
    // background-color: transparent;
    // pointer-events: auto;

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

    a {
      border: none;
    }

    .logo {
      display: none;
    }
    .panel {
      position: relative;
      left: initial;
      max-width: 100%;
      margin: 0;
      transform: none;
    }
  }
}
</style>
