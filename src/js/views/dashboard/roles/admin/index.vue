<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <h2>Dashboard</h2>
      </div>
    </header>
    <div class="table-container">
      <unpaid-bills />
      <!-- <report-income /> -->
    </div>
    <div class="table-container">
      <overpaid-bills />
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import ReportIncome from '@/views/reports/income'
import UnpaidBills from '@/views/reports/unpaidbills'
import OverpaidBills from '@/views/reports/overpaidbills'

export default {
  name: 'dashboard-admin',
  components: {
    ReportIncome,
    UnpaidBills,
    OverpaidBills
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.header {
  margin-bottom: 10px;
}
</style>