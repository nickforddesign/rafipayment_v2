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
import Transfer from '@/models/transfer'

export default {
  name: 'row',
  props: ['model'],
  models: {
    transfer() {
      return new Transfer(null, {
        computed: {
          urlRoot() {
            // console.log(this)
            return `transfers/${this.correlationId}`
          }
        }
      })
    }
  },
  created() {
    this.$transfer = this.model
  },
  methods: {
    goToModel() {
      this.$router.push(this.$transfer.urlRoot)
      // console.log(this.$transfer.urlRoot)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
