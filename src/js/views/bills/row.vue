<template>
  <tr @click="goToModel">
    <td>
      <a :href="$bill.url" @click.prevent>{{ $bill.due_date | moment }}</a>
    </td>
    <td>{{ $bill.target }}</td>
    <td>{{ $bill.type }}</td>
    <td>{{ $bill.balance | currency }}</td>
  </tr>
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
