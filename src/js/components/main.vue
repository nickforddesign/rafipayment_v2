<template>
  <div class="app-container">
    <div v-if="logged_in" class="nav-container">
      <logo />
      <!-- <button @click="alert">Test Alert</button>
      <button @click="confirm">Test Confirm</button> -->
      <navigation />
    </div>
    <main :class="[main_class]">
      <router-view></router-view>
    </main>
    <alert v-if="alert_visible" />
  </div>
</template>

<script>
import { path } from 'ramda'
import { mapGetters } from 'vuex'
import Navigation from './nav'
import Alert from './alert'
// import app from '@/app'

export default {
  name: 'app',
  computed: {
    main_class() {
      return this.logged_in
        ? 'content'
        : null
    },
    ...mapGetters({
      logged_in: 'session:logged_in',
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
    // alert() {
    //   app.alert(
    //     'This is a test alert',
    //     this.callback,
    //     'Test alert',
    //     'Yes',
    //     'neutral'
    //   )
    // },
    // confirm() {
    //   app.confirm(
    //     'This is a test confirm',
    //     this.callback,
    //     'Test confirm'
    //     // ['Yes', 'No']
    //   )
    // },
    // callback() {
    //   console.log('yep')
    // }
  },
  components: {
    Navigation,
    Alert
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

@media (min-width: $breakpoint-medium) {

  .nav-container {
    position: fixed;
    width: $sidebar-width;
    top: 0;
    bottom: 0;
    background: $color-nav-background;

    .logo {
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
      text-align: left;
    }
  }

}
</style>
