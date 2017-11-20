<template>
  <tr @click="goToModel">
    <td>
      <a :href="`/${$lease.urlRoot}`" @click.prevent>{{ $lease.property.address }}</a>
    </td>
    <td>{{ $lease.unit.name }}</td>
    <td>{{ $lease.start_date | moment('M/D/YYYY', true) }}</td>
    <td>{{ $lease.end_date | moment('M/D/YYYY', true) }}</td>
    <td>{{ $lease.length.months }} Mo.</td>
    <td>{{ current_rent }}</td>
  </tr>
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
