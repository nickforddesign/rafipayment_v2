<template>
  <div class="tenant">
    <onboarding v-if="steps" :steps="steps" @complete="completeOnboarding" />
    <slot v-else />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'

import app from '@/app'
import session from '@/session'
import Lease from '@/models/lease'
import getOnboardingSteps from '@/utils/onboarding/tenant_secondary'
import Onboarding from '@/views/activate/roles/tenant/secondary'

export default {
  name: 'tenant',
  data() {
    return {
      steps: null
    }
  },
  collection() {
    return new Collection({
      basePath: 'account/leases',
      model: Lease
    })
  },
  async created() {
    await this.fetch()
    this.checkSteps()
  },
  methods: {
    async fetch() {
      return await this.$collection.fetch()
    },
    checkSteps() {
      const steps = getOnboardingSteps(session.$user, this.collection)
      if (steps.length) {
        this.steps = steps
        app.alert(
          'Please take a moment to update your account information.',
          null,
          'Attention Required'
        )
      }
    },
    completeOnboarding() {
      this.steps = null
      app.alert(
        'Thank you for updating your account information!',
        null,
        'Account Updated',
        'OK',
        'success'
      )
    }
  },
  components: {
    Onboarding
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>