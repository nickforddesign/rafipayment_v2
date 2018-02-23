<template>
  <div class="model-view">
    <header>
      <div class="meta">
        <h2>Dashboard</h2>
      </div>
      <div class="actions">
        <!-- <button class="primary">Create New</button> -->
      </div>
    </header>
    <div class="table-container">
      <div class="header">
        Reports
      </div>
      <!-- <report-income /> -->
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import ReportIncome from '@/views/reports/income'

export default {
  name: 'dashboard-admin',
  components: {
    ReportIncome
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
