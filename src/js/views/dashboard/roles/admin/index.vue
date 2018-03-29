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
    <div class="grid">
      <div class="table-container grid__col grid__col--1-of-2">
        <div class="header">
          Bill Statuses
        </div>
        <bill-status-chart />
      </div>
      <div class="table-container grid__col grid__col--1-of-2">
        <div class="header">
          Recent Usage
        </div>
        <authentication-chart url="events?sort_created=-1&filter_type=authentication&filter_source.model=tenant&paginator_limit=800" />
      </div>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import ReportIncome from '@/views/reports/income'
import UnpaidBills from '@/views/reports/unpaidbills'
import OverpaidBills from '@/views/reports/overpaidbills'
import AuthenticationChart from '@/views/events/authentication/chart'
import BillStatusChart from '@/views/bills/status_chart'

export default {
  name: 'dashboard-admin',
  components: {
    ReportIncome,
    UnpaidBills,
    OverpaidBills,
    AuthenticationChart,
    BillStatusChart
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.header {
  margin-bottom: 10px;
}
</style>