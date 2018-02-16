<template>
  <div>
    <ul class="tabs">
      <li>
        <router-link :to="`/events/authentication`">Authentication</router-link>
      </li>
      <li>
        <router-link :to="`/events/notifications`">Notifications</router-link>
      </li>
      <li>
        <router-link :to="`/events/webhooks`">Webhooks</router-link>
      </li>
    </ul>
    <router-view class="scroll-container" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'events',
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
      if (path === 'events') {
        this.$router.replace(`/events/authentication`)
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/breakpoints';
@import '~%/mixins';

.scroll-container {
  // margin-top: -50px;
  margin-top: -16px;
}

@media (max-width: $breakpoint-medium) {
  .scroll-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin-top: 0;
    
    @include vertical_scroll;
  }
}
</style>
