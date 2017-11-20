<template>
  <div>
    <collection name="ledger" collection_name="transfers" :$collection="$collection">
      <div slot="actions">
        <button @click="add" class="primary">Add New Transfer</button>
      </div>

      <table slot="content">
        <thead>
          <tr>
            <td>Date</td>
            <td>Destination</td>
            <td>Source</td>
            <td>Type</td>
            <td>Status</td>
            <td width="80px" align="right">Amount</td>
          </tr>
        </thead>
        <tbody>
          <row v-for="(model, index) in collection" :key="index" :model="model" />
        </tbody>
      </table>
    </collection>

    <transfer-modal v-if="modal_visible" @close="closeModal" :confirm="confirmModal" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Transfer from '@/models/transfer'

import row from '../../row'
import transferModal from '@/components/modals/transfer'

export default {
  name: 'ledger',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'transfers',
      model: Transfer
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
    transferModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
