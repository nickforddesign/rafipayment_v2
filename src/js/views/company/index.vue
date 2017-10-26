<template>
  <div>
    <header>
      <div class="meta">
        <h2>Company</h2>
        {{ $company }}
      </div>
    </header>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'
import Company from '@/models/company'

export default {
  name: 'company',
  models: {
    company() {
      return new Company({
        id: session.$user.company,
        basePath: 'account/company'
      })
    }
  },
  created() {
    this.$company.fetch()
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
