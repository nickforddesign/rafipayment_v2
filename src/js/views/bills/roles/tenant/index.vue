<template>
  <div>
    <ul class="tabs">
      <li>
        <router-link :to="`/bills/current`">Current</router-link>
      </li>
      <li>
        <router-link :to="`/bills/past`">Past</router-link>
      </li>
    </ul>
    <router-view class="scroll-container" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'leases',
  created() {
    this.checkUrl()
  },
  watch: {
    $route() {
      this.checkUrl()
    }
  },
  methods: {
    checkUrl() {
      const path = this.$route.path.replace(/\//gi, '')
      if (path === 'bills') {
        this.$router.replace(`/bills/current`)
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/breakpoints';
@import '~%/mixins';

@media (max-width: $breakpoint-medium) {
  .scroll-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    
    @include vertical_scroll;
  }
}
</style>
