<template>
  <div>
    <header>
      <div class="meta">
        <h2>Leases({{ collection.length }})</h2>
      </div>
      <div class="actions">
        <search />
      </div>
    </header>
    <responsive-table :columns="[
      'Property',
      'Unit',
      'Start Date',
      'End Date',
      'Duration',
      'Current Rent'
    ]">
      <row v-for="(model, index) in collection" :key="index" :model="model" />
    </responsive-table>
    <!-- <table>
      <thead>
        <tr>
          <td>Property</td>
          <td>Unit</td>
          <td>Start Date</td>
          <td>End Date</td>
          <td>Duration</td>
          <td>Current Rent</td>
        </tr>
      </thead>
      <tbody>
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </tbody>
    </table> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Lease from '@/models/lease'

import row from '../../row'

export default {
  name: 'leases',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'account/leases',
      model: Lease
    })
  },
  created() {
    this.$collection.fetch()
  },
  components: {
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
