<template>
  <div>
    <ul class="tabs">
      <li>
        <router-link :to="`/account/profile`">Profile</router-link>
      </li>
      <li>
        <router-link :to="`/account/payment`">Payment Settings</router-link>
      </li>
    </ul>
    <router-view class="scroll-container" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'account'
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
