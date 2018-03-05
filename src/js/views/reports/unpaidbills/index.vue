<template>
  <div class="box">
    <unpaid-bills-table />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import UnpaidBillsTable from './table'

export default {
  name: 'unpaid-bills',
  components: {
    UnpaidBillsTable
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.box {
  padding: 0;
}
</style>
