<template>
  <div>
    <collection name="rent roll" collection_name="units" :$collection="$collection">

      <responsive-table slot="content" :columns="[
        'Unit',
        'Property',
        'Beds',
        'Baths',
        'Current Lease',
        {
          name: 'Current Rent',
          class: 'text-right'
        }
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
  name: 'rent-roll',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'units?sort_property=1',
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
