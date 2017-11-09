<template>
  <tr @click="goToModel">
    <td>
      <a :href="`/${$transfer.url}`" @click.prevent>{{ $transfer.created | moment('MM/DD/YYYY h:mm:ssa') }}</a>
    </td>
    <td>Destination</td>
    <td>Source</td>
    <td>Type</td>
    <td>{{ $transfer.direction }}</td>
    <td>{{ $transfer.status }}</td>
    <td align="right">{{ $transfer.amount.value | currency }}</td>
  </tr>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import { path } from 'ramda'
import session from '@/session'
import Transfer from '@/models/transfer'

export default {
  name: 'row',
  props: ['model'],
  models: {
    transfer() {
      return new Transfer(this.model, {
        computed: {
          urlRoot() {
            return `transfers/${this.correlationId}`
          },
          direction() {
            return this.source_id === session.$user.payment.account
              ? 'outgoing'
              : 'incoming'
          }
        }
      })
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
