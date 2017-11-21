<template>
  <div class="container x-sm activate-tenant">
    <component v-if="current !== null" :is="steps[current].name" :step="steps[current]" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import getSteps from '@/utils/onboarding/tenant'
import session from '@/session'
import Lease from '@/models/lease'

// steps
import setPassword from '../../steps/set_password'
import showLease from '../../steps/show_lease'
import period from '../../steps/period'
import autopay from '../../steps/autopay'
import dwolla from '../../steps/dwolla'

export default {
  name: 'activate-tenant',
  data() {
    return {
      steps: null,
      current: null
    }
  },
  collection() {
    return new Collection({
      basePath: 'account/leases',
      model: Lease
    })
  },
  async created() {
    await this.$collection.fetch()
    this.steps = getSteps(session.$user, this.collection)
    console.log(this.steps)
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
    setPassword,
    showLease,
    period,
    autopay,
    dwolla
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
@import '~%/colors';

.activate-tenant {
  .grid {
    text-align: center;

    .grid__col {
      margin-bottom: 30px;
    }
  }
  h2 {
    font-weight: bold;
    margin-bottom: 40px;
  }
  h3 {
    margin-bottom: 10px;
    color: $color-grey-60;
    font-size: 0.9em;
    font-weight: 500;
    text-transform: uppercase;
  }
  h4 {
    margin: 0;
    font-size: 1.1em;
    font-weight: 500;
  }
  .actions {
    margin: 10px 0 30px;
    // margin-bottom: 30px;

    & > div {
      margin-bottom: 12px;
    }
  }
  .note {
    font-size: 0.8em;
    margin: 30px 0;
  }
}
</style>