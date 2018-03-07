<template>
  <div class="indicator-container" @mouseover="onEnter" @mouseleave="onLeave">
    <div class="indicator" :class="{ paid: tenantHasPaid }" />

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
  name: 'indicator',
  props: ['tenant', 'bill'],
  data() {
    return {
      hovering: false
    }
  },
  computed: {
    tenantHasPaid() {
      return !!this.bill.transfers.find(transfer => transfer.source.id === this.tenant.id)
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
  border: 1px solid $color-status-success;
  opacity: 0.7;

  &.paid {
    background: $color-status-success;
  }

  &:hover {
    opacity: 1;
  }
}

.tooltip {
  position: absolute;
  bottom: 100%;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 0.7em;
  white-space: nowrap;
  background: darken($color-background-dark, 5%);
}
</style>
