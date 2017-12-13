<template>
  <div class="activate secondary">
    <div class="container x-sm">
      <transition name="fade">
        <component v-if="current !== null" :is="steps[current].name" :step="steps[current]" />
      </transition>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'

// steps
import setPassword from '../../steps/set_password'
import showLease from '../../steps/show_lease'
import period from '../../steps/period'
import autopay from '../../steps/autopay'

export default {
  name: 'activate-tenant',
  props: {
    steps: Array
  },
  data() {
    return {
      current: null
    }
  },
  async created() {
    this.getCurrentStep()
  },
  methods: {
    getCurrentStep() {
      const current_step = this.steps.indexOf(this.steps.find(step => !step.value))
      if (current_step !== -1) {
        this.current = current_step
      }
      // if there is no next step, current step will be -1
      return current_step + 1
    },
    next() {
      this.getCurrentStep() || this.complete()
    },
    async complete() {
      await session.refresh_session(this)
      this.$emit('complete')
    }
  },
  components: {
    setPassword,
    showLease,
    period,
    autopay
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

.secondary {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  padding-top: 60px;
  background: $color-background-dark;
}
</style>

