<template>
  <form @submit.prevent="validate">
    <h2>Set your split of the rent</h2>

    <div class="grid">
      <div class="grid__col grid__col--1-of-1">
        <h3>Total Rent</h3>
        <h4>{{ step.period.amount | currency }}</h4>
      </div>
    </div>

    <field name="my split" :errors="errors">
      <currency v-model="amount" />
    </field>

    <div class="actions">
      <button class="primary">Confirm</button>
    </div>

  </form>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Lease from '@/models/lease'
import Period from '@/models/lease/period'

export default {
  name: 'period',
  props: ['step'],
  data() {
    return {
      amount: null
    }
  },
  created() {
    const suggestion = this.$lease.getSuggestedSplit(this.step.period.id)
    this.amount = suggestion
  },
  models: {
    lease() {
      return new Lease(this.step.lease)
    },
    period() {
      return new Period(this.step.period, {
        basePath: `account/${this.$lease.url}/periods`
      })
    }
  },
  methods: {
    validate() {
      // validate split here
      this.save()
    },
    async save() {
      const body = {
        amount: this.amount
      }
      await this.$period.save(body)
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
.grid {
  text-align: center;
}
</style>