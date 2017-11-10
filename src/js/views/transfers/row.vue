<template>
  <tr @click="goToModel">
    <td>{{ $transfer.created | moment('MM/DD/YYYY h:mm:ssa') }}</td>
    <td>{{ $transfer.destination_name }}</td>
    <td>{{ $transfer.source_name }}</td>
    <td>{{ $transfer.type }}</td>
    <td>{{ $transfer.status }}</td>
    <td align="right">{{ $transfer.amount | currency }}</td>
  </tr>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import { path } from 'ramda'
// import session from '@/session'
import Transfer from '@/models/transfer'

export default {
  name: 'row',
  props: ['model'],
  models: {
    transfer() {
      return new Transfer(this.model)
    }
  },
  methods: {
    goToModel() {
      this.$router.push(`/${this.$transfer.urlRoot}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
