<template>
  <svg class="checkmark" viewBox="0 0 52 52">
    <circle cx="26" cy="26" r="25" />
    <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
  </svg>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'checkmark'
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

svg {
  width: 100px;
}

circle {
  fill: $color-status-success;
}

path {
  stroke: $color-background-default;
}
</style>
