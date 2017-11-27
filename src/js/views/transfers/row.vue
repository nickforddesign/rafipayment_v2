<template>
  <div class="tr" @click="goToModel">
    <div class="td">
      <span v-if="!$transfer.cancelled && !$transfer.processed && $transfer.scheduled_date">
        <a :href="`/${$transfer.url}`" @click.prevent>{{ $transfer.scheduled_date | moment('MM/DD/YYYY') }}</a>
        <span class="flag success">Scheduled</span>
      </span>
      <a v-else :href="`/${$transfer.url}`" @click.prevent>{{ $transfer.created | moment('MM/DD/YYYY h:mm:ssa') }}</a>
    </div>
    <div class="td">{{ $transfer.destination_name }}</div>
    <div class="td">{{ $transfer.source_name }}</div>
    <div class="td">{{ $transfer.type }}</div>
    <div class="td">
      <span :class="['text-color', status_class]">{{ $transfer.status }}</span>
    </div>
    <div class="td" align="right">{{ $transfer.amount | currency }}</div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Transfer from '@/models/transfer'

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
    goToModel() {
      this.$router.push(`/${this.$transfer.urlRoot}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
