<template>
  <div class="table collection-view">
    <div class="header">
      Leases
    </div>
    <div v-if="fetched">
      <div v-if="collection.length">
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
      <empty v-else>
        <div slot="message">This {{ $parent.$options.name }} doesn't have any leases yet</div>
        <button class="primary" slot="actions" @click="showModal">Add Lease</button>
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
  name: 'leases-table',
  props: {
    data: Object,
    path: String
  },
  data() {
    return {
      fetched: false,
      modal_visible: false
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
  methods: {
    showModal() {
      this.modal_visible = true
    }
  },
  components: {
    row
  }
}
</script>
