<template>
  <div>
    <collection name="leases" :$collection="$collection">
      <div slot="actions">
        <button @click="add" class="primary">Add Lease</button>
      </div>

      <responsive-table slot="content" :columns="[
        {
          name: 'Property',
          sort: 'search.property.display_name'
        },
        {
          name: 'Unit',
          sort: 'search.unit.name'
        },
        {
          name: 'Start Date',
          sort: false
        },
        'End Date',
        {
          name: 'Duration',
          sort: false
        },
        {
          name: 'Current Rent',
          class: 'text-right',
          width: '130px',
          sort: false
        }
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

    </collection>

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
      basePath: 'leases',
      query: {
        sort_created: -1
      },
      model: Lease
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
    leaseModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
