<template>
  <div>
    <header>
      <div class="meta">
        <h2>Ledger({{ collection.length }})</h2>
      </div>
      <div class="actions">
        <search />
        <button @click="add" class="primary">Add New Transfer</button>
      </div>
    </header>
    <table>
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
    transferModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
