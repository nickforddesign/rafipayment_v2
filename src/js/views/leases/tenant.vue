<template>
  <div class="indicator-container" @mouseover="onEnter" @mouseleave="onLeave">
    <div class="indicator" :style="{ background }" />

    <transition name="fade">
      <div class="tooltip" v-if="hovering">
        {{ tenant.full_name }}
      </div>
    </transition>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
export default {
  name: 'tenant',
  props: ['tenant'],
  data() {
    return {
      hovering: false
    }
  },
  computed: {
    background() {
      return this.tenant.avatar_color
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
  background: transparent;
  border-radius: 100%;
  opacity: 1;

  &.paid {
    background: $color-status-success;
  }

  &:hover {
    opacity: 1;
  }
}
</style>
