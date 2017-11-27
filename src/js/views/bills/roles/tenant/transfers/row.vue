<template>
  <div class="tr" @click="goToModel">
    <div class="td">
      <span v-if="$transfer.scheduled_date">
        <a :href="`/${$transfer.url}`" @click.prevent>{{ $transfer.scheduled_date | moment('MM/DD/YYYY') }}</a>
        <span class="flag neutral">Scheduled</span>
      </span>
      <a v-else :href="`/${$transfer.url}`" @click.prevent>{{ $transfer.created | moment('MM/DD/YYYY h:mm:ssa') }}</a>
    </div>
    <div class="td">{{ $transfer.source_name }}</div>
    <div class="td">{{ $transfer.type }}</div>
    <div class="td">{{ $transfer.status }}</div>
    <div class="td text-right">{{ $transfer.amount | currency }}</div>
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
  methods: {
    goToModel() {
      this.$router.push(`/${this.$transfer.urlRoot}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
