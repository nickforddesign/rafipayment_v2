<template>
  <div class="collection-view">
    <header>
      <div class="meta">
        <h2>Bills({{ collection.length }})</h2>
      </div>
      <div class="actions">
        <search />
      </div>
    </header>
    <table>
      <thead>
        <tr>
          <td>Due Date</td>
          <td>Target</td>
          <td>Type</td>
          <td>Balance</td>
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
import Bill from '@/models/bill'

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
      basePath: 'bills',
      model: Bill
    })
  },
  created() {
    this.$collection.fetch()
  },
  methods: {
    add() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    confirmModal() {
      this.$collection.fetch()
    }
  },
  components: {
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
