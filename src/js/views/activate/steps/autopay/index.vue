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
      password: '',
      password_confirm: ''
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

      await this.$lease.save(body, { path: 'autopay' })
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