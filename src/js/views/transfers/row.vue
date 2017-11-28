<template>
  <div class="tr" @click="goToModel">
    <cell>
      <span v-if="!$transfer.cancelled && !$transfer.processed && $transfer.scheduled_date">
        <a :href="`/${$transfer.url}`" @click.prevent>{{ $transfer.scheduled_date | moment('MM/DD/YYYY') }}</a>
        <span class="flag success">Scheduled</span>
      </span>
      <a v-else :href="`/${$transfer.url}`" @click.prevent>{{ $transfer.created | moment('MM/DD/YYYY h:mm:ssa') }}</a>
    </cell>
    <cell>{{ $transfer.destination_name }}</cell>
    <cell>{{ $transfer.source_name }}</cell>
    <cell>{{ $transfer.type }}</cell>
    <cell>
      <span :class="['text-color', status_class]">{{ $transfer.status }}</span>
    </cell>
    <cell className="text-right">{{ $transfer.amount | currency }}</cell>
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
