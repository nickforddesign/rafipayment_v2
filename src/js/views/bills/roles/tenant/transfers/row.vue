<template>
  <div class="tr" @click="goToModel">
    <div class="td">
      <div v-if="$transfer.scheduled_date" class="flexbox">
        <div class="flex">
          <a :href="`/${$transfer.url}`" @click.prevent>{{ $transfer.scheduled_date | moment }}</a>
        </div>
        <div class="status solid">
          <span class="flag neutral">Scheduled</span>
        </div>
      </div>
      <div v-else class="flexbox">
        <a :href="`/${$transfer.url}`" @click.prevent>{{ $transfer.created | moment('M/D/YY h:mma') }}</a>
      </div>
    </div>
    <div class="td">{{ $transfer.source.resolved.first_name }}</div>
    <div class="td">{{ $transfer.type }}</div>
    <div class="td">
      <span :class="['text-color', status_class]">
        {{ $transfer.source_status }}
      </span>
    </div>
    <div class="td text-right">{{ $transfer.amount | currency }}</div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Transfer from '@/models/transfer'

// const status_map = {
//   success: 'completed',
//   neutral: 'created',
//   danger: ['cancelled', 'failed']
// }

const status_map = {
  completed: 'success',
  created: 'neutral',
  cancelled: 'danger',
  failed: 'danger'
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
      // console.log(this)
      console.log(this.$transfer.source_status)
      console.log(status_map[this.$transfer.source_status])
      return status_map[this.$transfer.source_status]
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

<style scoped lang="scss">
.status {
  margin-left: 10px;
}
</style>
