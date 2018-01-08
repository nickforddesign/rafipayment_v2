<template>
  <div class="tr" @click="goToModel">
    <cell>
      <a :href="`/${$lease.urlRoot}`" @click.prevent>{{ $lease.property.address }}</a>
    </cell>
    <cell>{{ $lease.unit.name }}</cell>
    <cell>{{ $lease.start_date | moment('M/D/YY', true) }}</cell>
    <cell>{{ $lease.end_date | moment('M/D/YY', true) }}</cell>
    <cell>{{ lease_length }}</cell>
    <cell class="text-right">{{ current_rent }}</cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { prettyCurrency } from '@/utils'
import Lease from '@/models/lease'

export default {
  name: 'row',
  props: ['model'],
  models: {
    lease() {
      return new Lease(this.model)
    }
  },
  computed: {
    current_rent() {
      return this.$lease.is_active
        ? prettyCurrency(this.$lease.periods_sorted[this.$lease.current_period].amount)
        : '–'
    },
    lease_length() {
      return this.$lease.length.months
        ? `${this.$lease.length.months} Mo.`
        : 'N/A'
    }
  },
  methods: {
    goToModel() {
      this.$router.push(`/${this.$lease.urlRoot}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
