<template>
  <tr>
    <td>{{ $lease.property.address }}</td>
    <td>{{ $lease.unit.name }}</td>
    <td>{{ $lease.start_date | moment('M/D/YYYY') }}</td>
    <td>{{ $lease.end_date | moment('M/D/YYYY') }}</td>
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
      return new Lease()
    }
  },
  created() {
    this.$lease = this.model
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
