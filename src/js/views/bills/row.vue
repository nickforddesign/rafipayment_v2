<template>
  <div class="tr" @click="goToModel">
    <cell>
      <a :href="$bill.url" @click.prevent>{{ $bill.due_date | moment }}</a>
    </cell>
    <cell>{{ $bill.target }}</cell>
    <cell>{{ $bill.type }}</cell>
    <cell class="text-right">{{ $bill.balance | currency }}</cell>
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
