<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <h2>Payment Settings</h2>
      </div>
    </header>
    
    <funding-sources-table :data="this.$user.payment" v-if="$user.role !== 'superadmin'" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'

import FundingSourcesTable from '@/views/funding_sources/table'

export default {
  name: 'account-payment',
  models: {
    user() {
      return session.$user
    }
  },
  components: {
    FundingSourcesTable
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/breakpoints';

@media (max-width: $breakpoint-medium) {
  header {
    display: none;
  }
}
</style>
