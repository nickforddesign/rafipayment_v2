<template>
  <tr @click="goToModel">
    <td>{{ $bill.due_date | moment }}</td>
    <!-- <td>
      <a :href="`/${$bill.urlRoot}`" @click.prevent>{{ $bill.id }}</a>
    </td> -->
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
