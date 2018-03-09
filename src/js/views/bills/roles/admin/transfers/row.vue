<template>
  <div class="tr" @click.exact="goToModel" @click.ctrl="goToModel" @click.meta="goToModelNew">
    <div class="td">
      <router-link :to="`/${$transfer.urlRoot}`">{{ $transfer.created | moment('M/D/YY h:mm:ssa') }}</router-link>
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
import { smartClick } from '@/utils'

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
    goToModel(e) {
      smartClick(e, () => this.$router.push(`/${this.$transfer.urlRoot}`))
    },
    goToModelNew(e) {
      smartClick(e, () => window.open(`/${this.$transfer.urlRoot}`))
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
