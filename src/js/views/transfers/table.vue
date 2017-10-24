<template>
  <div class="table">
    <div class="header">
      Payments
    </div>
    <div v-if="fetched">
      <table>
        <thead>
          <tr>
            <td>Date</td>
            <td>Destination</td>
            <td>Source</td>
            <td>Type</td>
            <td>Status</td>
            <td width="80px" align="right">Amount</td>
          </tr>
        </thead>
        <tbody>
          <row v-for="(model, index) in collection" :key="index" :model="model" />
        </tbody>
      </table>
    </div>
    <loading v-else type="table" />
    <!-- <loading type="input" /> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'

import row from './row'

export default {
  name: 'transfers-table',
  props: {
    data: Object
  },
  data() {
    return {
      fetched: false
    }
  },
  collection() {
    return new Collection({
      basePath: `account/payment/transfers?search=${this.data.id}`
    })
  },
  async created() {
    await this.$collection.fetch()
    this.fetched = true
  },
  components: {
    row
  }
}
</script>
