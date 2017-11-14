<template>
  <div class="table collection-view">
    <div class="header">
      Payments
    </div>
    <div v-if="fetched">
      <table v-if="collection.length">
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
      <empty v-else>
        <div slot="message">No payments yet</div>
      </empty>
    </div>
    <loading v-else type="table" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'

import row from './row'

export default {
  name: 'transfers-table',
  props: {
    data: Object,
    path: String
  },
  data() {
    return {
      fetched: false
    }
  },
  collection() {
    return new Collection({
      basePath: this.path
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
