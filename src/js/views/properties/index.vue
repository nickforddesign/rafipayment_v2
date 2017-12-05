<template>
  <div class="collection-view">
    <collection name="properties" :$collection="$collection">
      <div slot="actions">
        <button @click="add" class="primary">Add Property</button>
      </div>

      <responsive-table slot="content" :columns="[
        'Name',
        'Address',
        'Units'
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

    </collection>

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
