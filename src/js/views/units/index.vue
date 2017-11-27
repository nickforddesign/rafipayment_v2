<template>
  <div>
    <collection name="units" :$collection="$collection">
      <div slot="actions">
        <button @click="add" class="primary">Add New Unit</button>
      </div>

      <responsive-table slot="content" :columns="[
        'Unit',
        'Property',
        'Current Lease',
        'Beds',
        'Baths'
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

    </collection>

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
