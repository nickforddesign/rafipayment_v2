<template>
  <div class="box flexbox transfer" @click="goToModel">
    <div class="solid">
      <div>{{ $transfer.created | moment('M/D/YY h:mma') }}</div>
      <div class="description">{{ $transfer.type }}</div>
    </div>
    <div class="solid text-right">
      <div>{{ $transfer.amount | currency }}</div>
      <div :class="['description', 'text-color', $transfer.statusClass($transfer.source_status)]">{{ $transfer.source_status }}</div>
    </div>
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

// const status_map = {
//   completed: 'success',
//   created: 'neutral',
//   pending: 'neutral',
//   cancelled: 'danger',
//   failed: 'danger'
// }

export default {
  name: 'row',
  props: ['model'],
  models: {
    transfer() {
      return new Transfer(this.model)
    }
  },
  // computed: {
  //   status_class() {
  //     return status_map[this.$transfer.source_status]
  //   }
  // },
  methods: {
    goToModel() {
      this.$router.push(`/${this.$transfer.urlRoot}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/breakpoints';

.transfer {
  font-size: 0.9em;

  .description {
    margin-top: 8px;
  }
}

@media (min-width: $breakpoint-medium) {
  font-size: 1.1em;
}
</style>
