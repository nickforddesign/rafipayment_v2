<template>
  <div>
    <collection name="leases" :$collection="$collection">
      <div slot="actions">
        <button @click="add" class="primary">Add New Lease</button>
      </div>

      <table slot="content">
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
