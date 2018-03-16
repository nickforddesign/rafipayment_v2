<template>
  <div class="tr" @click.exact="goToModel" @click.ctrl="goToModel" @click.meta="goToModelNew">
    <cell>
      <span v-if="!$transfer.cancelled && !$transfer.processed && $transfer.scheduled_date">
        <router-link :to="`/${$transfer.url}`">{{ $transfer.scheduled_date | moment('M/D/YY', true) }}</router-link>
        <span class="flag success">Scheduled</span>
      </span>
      <router-link v-else :to="`/${$transfer.url}`">{{ $transfer.created | moment('M/D/YY h:mma') }}</router-link>
    </cell>
    <cell>{{ $transfer.destination_name }}</cell>
    <cell>{{ $transfer.source_name }}</cell>
    <cell>{{ $transfer.type | replace('_', '-') }}</cell>
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
