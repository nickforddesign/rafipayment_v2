<template>
  <div>
    <h2>Setup Autopay</h2>

    <div class="grid">
      <div class="grid__col grid__col--1-of-1">
        <h3>Rent collection day</h3>
        {{ this.step.lease.bill_due_day | ordinal }} of each month
      </div>
    </div>

    <div class="actions">
      <div>
        <button class="primary" @click="validate">Turn on Autopay</button>
      </div>
      <div>
        <button class="link" @click="complete">Skip for now</button>
      </div>
    </div>
    <loading v-if="loading" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Lease from '@/models/lease'
import session from '@/session'

export default {
  name: 'autopay',
  props: ['step'],
  models: {
    user() {
      return session.$user
    },
    lease() {
      return new Lease(this.step.lease, {
        basePath: 'account/leases'
      })
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async validate() {
      this.save()
    },
    async save() {
      const body = {
        autopay: true
      }

      this.loading = true

      await this.$lease.save(body, { path: 'autopay' })

      this.loading = false
      this.complete()
    },
    complete() {
      this.step.value = true
      this.$parent.next()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
  
</style>