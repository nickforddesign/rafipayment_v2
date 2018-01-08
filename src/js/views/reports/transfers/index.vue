<template>
  <div class="box">
    <h3>Transfers by account</h3>
    <select-menu v-model="date" v-if="range_fetched">
      <option v-for="(date, index) in dates" :key="index" :value="date">{{ date }}</option>
    </select-menu>
    <loading v-else type="input" />
    <div class="actions">
      <a class="button" :href="`${api}reports/account?date=${today}&token=${token.token}`" target="_blank">Download .XLSX</a>
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

import config from '@/config'
import { getMonthsArray } from '@/utils'

export default {
  name: 'reports-transfers',
  data() {
    return {
      range_fetched: false,
      date: moment.utc().format('MM/YYYY'),
      dates: null
    }
  },
  mounted() {
    this.fetchRange()
  },
  computed: {
    api() {
      return config.api
    },
    today() {
      return this.date
    },
    ...mapGetters({
      token: 'session:access'
    })
  },
  methods: {
    async fetchRange() {
      const { min, max } = await this.$request('transfers/range/bank_transfer_status_dates.customer_bank_transfer_completed')
      const array = getMonthsArray(min, max)
      this.dates = array
      this.range_fetched = true
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
// .select-container {
//   margin-bottom: 20px;
// }
.actions {
  margin-top: 20px;
}
</style>