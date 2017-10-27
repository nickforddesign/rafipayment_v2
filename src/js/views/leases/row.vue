<template>
  <tr @click="goToModel">
    <td>
      <a :href="`/${$lease.urlRoot}`" @click.prevent>{{ $lease.property.address }}</a>
    </td>
    <td>{{ $lease.unit.name }}</td>
    <td>{{ $lease.start_date | moment('M/D/YYYY', true) }}</td>
    <td>{{ $lease.end_date | moment('M/D/YYYY', true) }}</td>
    <td>{{ $lease.length.months }} Mo.</td>
    <td>{{ $lease.rent | currency }}</td>
  </tr>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Lease from '@/models/lease'

export default {
  name: 'row',
  props: ['model'],
  models: {
    lease() {
      return new Lease(this.model)
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
