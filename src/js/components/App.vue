<template>
  <div id="app">
    <div v-if="logged_in" class="nav-container">
      <logo />
      <navigation />
    </div>
    <main :class="[main_class]">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
// import _ from 'lodash'
import { path } from 'ramda'
import { mapGetters } from 'vuex'
import Navigation from './nav'

export default {
  name: 'app',
  computed: {
    main_class() {
      return this.logged_in
        ? 'content'
        : null
    },
    ...mapGetters({
      logged_in: 'session:logged_in'
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
      // return _.get(this.$route, 'query.redirect') || '/dashboard'
      return path(['query', 'redirect'], this.$route) || '/dashboard'
    }
  },
  components: {
    Navigation
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';
@import '~%/breakpoints';

$sidebar-width: 230px;

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
      // right: 0;
      top: 0;
      bottom: 0;
      // margin-left: $sidebar-width;
      width: 1200px;
      max-width: calc(100% - #{$sidebar-width});
      padding: 30px;
      text-align: left;
    }
  }

}
</style>
