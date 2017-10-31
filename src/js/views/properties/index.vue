<template>
  <div class="collection-view">
    <header>
      <div class="meta">
        <h2>Properties({{collection.length}})</h2>
      </div>
      <div class="actions">
        <search />
        <button class="primary" @click="add">Add New Property</button>
      </div>
    </header>
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Address</td>
          <td>Units</td>
        </tr>
      </thead>
      <tbody>
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </tbody>
    </table>
    <property-modal v-if="modal_visible" @close="closeModal" :confirm="confirmModal" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Property from '@/models/property'

import row from './row'

import propertyModal from '@/components/modals/property'

export default {
  name: 'properties',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'properties',
      model: Property
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
    propertyModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
