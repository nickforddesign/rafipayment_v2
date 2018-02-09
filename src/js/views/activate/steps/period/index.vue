<template>
  <form @submit.prevent="validate">
    <h2>Set your split of the rent</h2>

    <div class="grid" v-if="$lease.periods.length > 1">
      <div class="grid__col grid__col--1-of-1">
        <h3>Billing Period</h3>
        <h4>{{ step.period.start_date | moment('M/D/YY', true) }} – {{ index }} of {{ $lease.periods.length }}</h4>
      </div>
    </div>

    <div class="grid">
      <div class="grid__col grid__col--1-of-1">
        <h3>Total Rent</h3>
        <h4>{{ step.period.amount | currency }}</h4>
      </div>
    </div>

    <div class="container amount">
      <field name="rent split" :errors="errors">
        <currency v-model="amount" v-validate="'required|min_currency:0.00|max_currency:5000'" name="rent split" />
      </field>
    </div>

    <div class="actions">
      <button class="primary">Confirm</button>
    </div>

    <loading v-if="loading" />

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
      amount: null,
      loading: false
    }
  },
  mounted() {
    this.setSuggestion()
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
  computed: {
    index() {
      return this.step.lease.periods.indexOf(this.step.period) + 1
    }
  },
  watch: {
    step() {
      this.$period.reset()
      this.$period = this.step.period
      this.setSuggestion()
    }
  },
  methods: {
    setSuggestion() {
      const suggestion = this.$lease.getSuggestedSplit(this.step.period.id)
      this.amount = suggestion
    },
    async validate() {
      const passed = await this.$validator.validateAll()
      if (passed) {
        this.save()
      }
    },
    async save() {
      const body = {
        amount: this.amount
      }
      this.loading = true
      await this.$period.save(body)
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
.grid {
  text-align: center;
}
.container.amount {
  width: 300px;
  margin: 0 auto 30px;
}
</style>