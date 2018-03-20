<template>
  <svg viewBox="0 0 52 52">
    <circle cx="26" cy="26" r="25"/>
    <line class="st0" x1="14.8" y1="37.2" x2="37.2" y2="14.8"/>
    <line class="st0" x1="14.8" y1="14.8" x2="37.2" y2="37.2"/>
  </svg>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'icon-x'
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

svg {
  width: 56px;
}

circle {
  fill: $color-status-danger;
}

line {
  stroke: $color-background-default;
}
</style>
