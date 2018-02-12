<template>
  <div class="tr" @click="goToModel">
    <cell>
      <span v-if="!$transfer.cancelled && !$transfer.processed && $transfer.scheduled_date">
        <a :href="`/${$transfer.url}`" @click.prevent>{{ $transfer.scheduled_date | moment('M/D/YY') }}</a>
        <span class="flag success">Scheduled</span>
      </span>
      <a v-else :href="`/${$transfer.url}`" @click.prevent>{{ $transfer.created | moment('M/D/YY h:mma') }}</a>
    </cell>
    <cell>{{ $transfer.destination_name }}</cell>
    <cell>{{ $transfer.source_name }}</cell>
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
    goToModel() {
      this.$router.push(`/${this.$transfer.urlRoot}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
