<template>
  <div class="container x-sm">
    <component v-if="current !== null" :is="steps[current].name" :step="steps[current]" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import getSteps from '@/utils/onboarding/admin'
import session from '@/session'

// steps
import setPassword from '../../steps/set_password'

export default {
  name: 'activate-admin',
  data() {
    return {
      steps: null,
      current: null
    }
  },
  async created() {
    this.steps = getSteps(session.$user, this.collection)
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
      this.$router.push('/dashboard')
    }
  },
  components: {
    setPassword
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

