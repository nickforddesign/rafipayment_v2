<template>
  <div class="collection-view">
    <collection name="properties" :$collection="$collection">
      <div slot="actions">
        <button @click="add" class="primary">Add New Property</button>
      </div>

      <table slot="content">
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
    </collection>

    <property-modal v-if="modal_visible" @close="closeModal" :confirm="confirmModal" />

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import collection from '@/components/collection'
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
    // this.$collection.fetch()
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
    collection,
    propertyModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
