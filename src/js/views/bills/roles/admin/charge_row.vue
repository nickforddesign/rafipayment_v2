<template>
  <div class="tr">
    <cell>
      {{ $charge.charge_type | capitalize | replace }} {{ description }}
    </cell>
    <cell></cell>
    <cell></cell>
    <cell class="text-right">
      {{ $charge.amount | currency }}
    </cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Charge from '@/models/lease/charge'

export default {
  name: 'charge-row',
  props: {
    data: Object
  },
  models: {
    charge() {
      return new Charge(this.data)
    }
  },
  computed: {
    description() {
      if (this.$charge.description) {
        return ` - ${this.$charge.description}`
      }
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
