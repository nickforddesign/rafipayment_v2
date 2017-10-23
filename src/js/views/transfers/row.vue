<template>
  <tr @click="goToModel">
    <td>{{ $transfer.created | moment('MM/DD/YYYY h:mm:ssa') }}</td>
    <td>Destination</td>
    <td>Source</td>
    <td>Type</td>
    <td>{{ $transfer.status }}</td>
    <td align="right">{{ $transfer.amount.value | currency }}</td>
  </tr>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Transfer from '@/models/property'

export default {
  name: 'row',
  props: ['model'],
  models: {
    property() {
      return new Transfer()
    }
  },
  created() {
    this.$transfer = this.model
  },
  methods: {
    goToModel() {
      this.$router.push(this.$transfer.urlRoot)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
