<template>
  <div class="tr" @click="goToModel">
    <div class="td">
      <a :href="`/${$lease.urlRoot}`" @click.prevent>{{ $lease.property.address }}</a>
    </div>
    <div class="td">{{ $lease.unit.name }}</div>
    <div class="td">{{ $lease.start_date | moment('M/D/YYYY', true) }}</div>
    <div class="td">{{ $lease.end_date | moment('M/D/YYYY', true) }}</div>
    <div class="td">{{ $lease.length.months }} Mo.</div>
    <div class="td">{{ current_rent }}</div>
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
