<template>
  <div class="collection-view">
    <header>
      <div class="meta">
        <h2>Units({{collection.length}})</h2>
      </div>
      <div class="actions">
        <search />
        <button class="primary" @click="add">Add New Unit</button>
      </div>
    </header>
    <table>
      <thead>
        <tr>
          <td>Unit</td>
          <td>Property</td>
          <td>Current Lease</td>
          <td>Beds</td>
          <td>Baths</td>
        </tr>
      </thead>
      <tbody>
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </tbody>
    </table>
    <unit-modal v-if="modal_visible" @close="closeModal" :confirm="confirmModal" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Unit from '@/models/unit'

import row from './row'

import unitModal from '@/components/modals/unit'

export default {
  name: 'properties',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'units',
      model: Unit
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
    unitModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
