<template>
  <tr>
    <td>{{ $lease.property.address }}</td>
    <td>{{ $lease.unit.number }}</td>
    <td>{{ $lease.start_date | moment('M/D/YYYY') }}</td>
    <td>{{ $lease.end_date | moment('M/D/YYYY') }}</td>
    <td>{{ $lease.length.months }} Mo.</td>
    <td>{{ $lease.rent | currency }}</td>
  </tr>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Lease from '@/models/property'

export default {
  name: 'row',
  props: ['model'],
  models: {
    property() {
      return new Property()
    }
  },
  created() {
    this.$property = this.model
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
