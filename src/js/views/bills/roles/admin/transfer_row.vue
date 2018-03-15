<template>
  <div class="tr">
    <cell>
      Payment ({{ $transfer.type }})
    </cell>
    <cell>
      {{ $transfer.created | moment('M/D/YY h:mma') }}
    </cell>
    <cell class="text-color" :class="[status_class]">
      {{ $transfer.source_status }}
    </cell>
    <cell class="text-right">
      {{ $transfer.amount | currency }}
    </cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Transfer from '@/models/transfer'

export default {
  name: 'transfer',
  props: {
    data: Object
  },
  computed: {
    status_class() {
      return this.$transfer.statusClass(this.$transfer.source_status)
    }
  },
  models: {
    transfer() {
      return new Transfer(this.data)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
