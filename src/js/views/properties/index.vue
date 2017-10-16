<template>
  <div>
    <header>
      <div class="meta">
        <h2>Properties</h2>
      </div>
      <div class="actions">
        <search />
        <button class="primary">Add New Property</button>
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
import data from './properties_collection'
import row from './row'

export default {
  name: 'properties',
  computed: {
    collection() {
      return data
    }
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
