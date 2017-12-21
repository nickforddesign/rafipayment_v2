<template>
  <svg viewBox="0 0 40 40" class="close-icon" @click="emitClick">
    <g>
      <line class="st0" x1="1.5" y1="1.5" x2="38.5" y2="38.5"/>
      <line class="st0" x1="1.5" y1="38.5" x2="38.5" y2="1.5"/>
    </g>
  </svg>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'icon-close',
  methods: {
    emitClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
svg {
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 5px;
  stroke-miterlimit: 15;
  transform: rotate(180deg);

  line {
    stroke-width: 3;
  }
}
</style>
