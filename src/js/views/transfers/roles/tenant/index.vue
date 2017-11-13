<template>
  <div class="collection-view">
    <collection name="ledger" :$collection="$collection" :limit="5" :paginate="true">
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
import collection from '@/components/collection'
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
      basePath: 'account/transfers',
      model: Transfer
    })
  },
  methods: {
    async fetch() {
      this.fetched = false
      this.$collection.reset()
      await this.$collection.fetch()
      this.fetched = true
    },
    add() {
      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
    },
    confirmModal() {
      this.fetch()
    }
  },
  components: {
    row,
    collection,
    transferModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
</style>

