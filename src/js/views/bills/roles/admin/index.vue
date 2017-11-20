<template>
  <div>
    <collection name="bills" :$collection="$collection">
      <div slot="actions">
        <button @click="add" class="primary">Add New Bill</button>
      </div>

      <table slot="content">
        <thead>
          <tr>
            <td>Due Date</td>
            <td>Target</td>
            <td>Type</td>
            <td>Balance</td>
          </tr>
        </thead>
        <tbody>
          <row v-for="(model, index) in collection" :key="index" :model="model" />
        </tbody>
      </table>
    </collection>

    <bill-modal v-if="modal_visible" @close="closeModal" :confirm="fetch" />

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Bill from '@/models/bill'

import BillModal from '@/components/modals/bill'

import row from '../../row'

export default {
  name: 'leases',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'bills',
      model: Bill
    })
  },
  methods: {
    fetch() {
      this.$collection.fetch()
    },
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
    BillModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
