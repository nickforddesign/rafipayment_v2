<template>
  <div class="table collection-view">
    <div class="header">
      Payments
    </div>
    <div v-if="model.has_transfers">
      <div v-if="model.transfers_resolved.length">
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
    </div>
    <empty v-else>
      <div slot="message">There are no payments on this bill yet</div>
    </empty>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import row from './row'

export default {
  name: 'transfers-table',
  props: {
    data: Object,
    model: Object
  },
  data() {
    return {
      fetched: false
    }
  },
  computed: {
    collection() {
      return this.model.transfers_resolved
    }
  },
  components: {
    row
  }
}
</script>
