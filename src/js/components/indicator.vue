<template>
  <div class="indicator-container" @mouseover="onEnter" @mouseleave="onLeave">
    <div class="indicator" :class="[status]" />

    <transition name="fade">
      <div class="tooltip" v-if="hovering">
        <slot />
      </div>
    </transition>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'indicator',
  props: ['status'],
  data() {
    return {
      hovering: false
    }
  },
  methods: {
    onEnter() {
      this.hovering = true
    },
    onLeave() {
      this.hovering = false
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

$indicator-size: 10px;

.indicator-container {
  display: inline-block;
  position: relative;
  padding-right: $indicator-size / 2;
}

.indicator {
  display: inline-block;
  height: $indicator-size;
  width: $indicator-size;
  border-radius: 100%;
  opacity: 0.7;

  &.paid {
    background: $color-status-success;
  }

  &:hover {
    opacity: 1;
  }

  &.success {
    background: $color-status-success;
  }

  &.warning {
    background: $color-status-warning;
  }

  &.neutral {
    background: $color-status-neutral;
  }

  &.danger {
    background: $color-status-danger;
  }

  &.none {
    background: $color-status-none;
  }
}
</style>
