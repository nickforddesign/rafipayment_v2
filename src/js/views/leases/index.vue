<template>
  <div>
    <header>
      <div class="meta">
        <h2>Leases</h2>
        <!-- {{ collection.length }} -->
      </div>
      <div class="actions">
        <search />
        <button class="primary">Add New Lease</button>
      </div>
    </header>
    <table>
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
    </table>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Lease from '@/models/lease'
import data from './leases_collection'
import row from './row'

console.log({data})

export default {
  name: 'leases',
  collection() {
    return new Collection({
      bathPath: 'leases',
      model: Lease
    }, data)
    // return data
  },
  created() {
    console.log(this.collection)
  },
  components: {
    row
  }
  // created() {
  //   console.log(data)
  // }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
