<template>
  <div>
    <collection name="ledger" collection_name="transfers" :$collection="$collection" :searchable="false">
      <div slot="actions">
        <button @click="exportData">Export</button>
        <button @click="add" class="primary">Add Transfer</button>
      </div>

      <responsive-table slot="content" :columns="[
        'Date',
        'Destination',
        'Source',
        'Type',
        'Status',
        {
          name: 'Amount',
          class: 'text-right' ,
          width: '80px',
          label: false
        }
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

    </collection>

    <transfer-modal v-if="modal_visible" @close="closeModal" :confirm="confirmModal" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import json2csv from 'json2csv'
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
    },
    exportData() {
      // const xls = json2xls(this.collection)
      const data = json2csv({
        fields: [
          'id',
          'amount'
          // 'bank_transfer_status',
          // 'bill',
          // 'cancelled',
          // 'company',
          // 'correlation_id',
          // 'created',
          // 'destination',
          // 'failed',
          // 'failure',
          // 'idempotency_key',
          // 'lease',
          // 'message',
          // 'parties',
          // 'processed',
          // 'property',
          // 'resource_id',
          // 'responses',
          // 'scheduled_date',
          // 'source',
          // 'status',
          // 'type',
          // 'unit',
          // 'updated',
          // 'webhooks'
        ],
        data: this.collection
      })
      window.datorm = data
      console.log({data})
    }
  },
  components: {
    row,
    transferModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
