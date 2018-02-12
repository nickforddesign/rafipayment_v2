<template>
  <div class="tr" @click="goToModel">
    <div class="td">
      <a :href="`/${$transfer.urlRoot}`" @click.prevent>{{ $transfer.created | moment('M/D/YY h:mm:ssa') }}</a>
    </div>
    <div class="td">{{ $transfer.source.resolved.first_name }} {{ $transfer.source.resolved.last_name }}</div>
    <div class="td">{{ $transfer.type }}</div>
    <div class="td">
      <span :class="['text-color', status_class]">{{ $transfer.source_status }}</span>
    </div>
    <div class="td" align="right">{{ $transfer.amount | currency }}</div>
  </div>
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
            return `transfers/${this.id}`
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
      return this.$transfer.statusClass(this.$transfer.source_status)
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
