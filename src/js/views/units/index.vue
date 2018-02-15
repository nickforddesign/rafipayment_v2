<template>
  <div>
    <collection name="units" :$collection="$collection">
      <div slot="actions">
        <button @click="add" class="primary">Add Unit</button>
      </div>

      <responsive-table slot="content" :columns="[
        {
          name: 'Unit',
          sort: 'name'
        },
        {
          name: 'Property',
          sort: 'search.property.display_name'
        },
        {
          name: 'Beds',
          sort: 'bed_count'
        },
        {
          name: 'Baths',
          sort: 'bath_count'
        },
        {
          name: 'Current Lease',
          sort: false
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
  name: 'units',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'units',
      query: {
        'sort_search.property.display_name': 1
      },
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
