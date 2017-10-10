<template>
  <div id="app">
    <div v-if="logged_in" class="nav-container">
      <logo />
      <navigation />
    </div>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navigation from './nav'

export default {
  name: 'app',
  computed: {
    ...mapGetters({
      logged_in: 'session:logged_in'
    })
  },
  components: {
    Navigation
  }
}
</script>

<style scoped lang="scss">
@import '~%/colors';

$sidebar-width: 230px;

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
  margin-left: $sidebar-width;
}
</style>
