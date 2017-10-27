<template>
  <div>
    <header>
      <div class="meta">
        <h2>Leases({{ collection.length }})</h2>
      </div>
      <div class="actions">
        <search />
        <button @click="add" class="primary">Add New Lease</button>
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
    <lease-modal v-if="modal_visible" @close="closeModal" :confirm="confirmModal" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Lease from '@/models/lease'

import row from '../../row'
import leaseModal from '@/components/modals/lease'

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
    row,
    leaseModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
