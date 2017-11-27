<template>
  <div class="tr" @click="goToModel">
    <div class="td">
      <a :href="$bill.url" @click.prevent>{{ $bill.due_date | moment }}</a>
    </div>
    <div class="td">{{ $bill.target }}</div>
    <div class="td">{{ $bill.type }}</div>
    <div class="td">{{ $bill.balance | currency }}</div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Bill from '@/models/bill'

export default {
  name: 'row',
  props: ['model'],
  models: {
    bill() {
      return new Bill(this.model)
    }
  },
  methods: {
    goToModel() {
      this.$router.push(`/${this.$bill.urlRoot}`)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
