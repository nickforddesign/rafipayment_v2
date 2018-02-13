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
import session from '@/session'
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
      if (this.$transfer.source.id === session.$user.id) {
        this.$router.push(`/${this.$transfer.urlRoot}`)
      }
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
