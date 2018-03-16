<template>
  <div class="tr" @click.exact="goToModel" @click.ctrl="goToModelNew" @click.meta="goToModelNew">
    <cell>
      <span v-if="!$transfer.cancelled && !$transfer.processed && $transfer.scheduled_date">
        <router-link :to="`/${$transfer.url}`">{{ $transfer.scheduled_date | moment('M/D/YY') }}</router-link>
        <span class="flag success">Scheduled</span>
      </span>
      <a v-else :href="`/${$transfer.url}`" @click.prevent>{{ $transfer.created | moment('M/D/YY h:mma') }}</a>
    </cell>
    <cell>{{ $transfer.destination_name }}</cell>
    <cell>{{ $transfer.type }}</cell>
    <cell>
      <span :class="['text-color', status_class]">{{ $transfer.source_status }}</span>
    </cell>
    <cell class="text-right">{{ $transfer.amount | currency }}</cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Transfer from '@/models/transfer'
import { smartClick } from '@/utils'

const map = {
  neutral: [
    'customer_transfer_created',
    'customer_transfer_scheduled'
  ],
  success: [
    'customer_transfer_completed'
  ],
  danger: [
    'customer_transfer_failed',
    'customer_transfer_cancelled'
  ]
}

export default {
  name: 'row',
  props: ['model'],
  models: {
    transfer() {
      return new Transfer(this.model)
    }
  },
  computed: {
    status_class() {
      let output
      for (let key in map) {
        if (map[key].includes(this.$transfer.status)) {
          output = key
        }
      }
      return output
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
