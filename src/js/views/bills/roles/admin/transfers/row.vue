<template>
  <tr @click="goToModel">
    <td>
      <a :href="$transfer.urlRoot" @click.prevent>{{ $transfer.created | moment('M/D/YY h:mm:ssa') }}</a>
    </td>
    <td>Destination</td>
    <td>Source</td>
    <td>{{ $transfer.type }}</td>
    <td>
      <span :class="['flag', status_class]">{{ $transfer.status }}</span>
    </td>
    <td align="right">{{ $transfer.amount | currency }}</td>
  </tr>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
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
            return `transfers/${this.correlation_id}`
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
  computed: {
    status_class() {
      const map = {
        pending: 'neutral',
        completed: 'success',
        error: 'danger',
        failed: 'danger'
      }
      return map[this.$transfer.status]
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
