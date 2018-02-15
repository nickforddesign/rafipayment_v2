<template>
  <div>
    <collection
      collection_name="current bills"
      :label="false"
      :$collection="$collection"
      :searchable="false"
      :paginate="false"
      ref="collection">

      <responsive-table slot="content" :columns="[
        {
          name: 'Due Date',
          sort: false
        },
        {
          name: 'Target',
          sort: false
        },
        {
          name: 'Type',
          sort: false
        },
        {
          name: 'Balance',
          class: 'text-right',
          sort: false
        }
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" @showModal="showModal" />
      </responsive-table>

      <div slot="empty-message">
        <checkmark />
        No current bills, you're all set!
      </div>

    </collection>

    <transfer-modal :model="current_model" @close="closeModal" v-if="modal_visible" :confirm="fetch" :suggestion="amount" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Bill from '@/models/bill'
import TransferModal from '@/components/modals/bill/transfer'
import Checkmark from '@/components/icons/checkmark'

import row from './row'

export default {
  name: 'bills-current',
  collection() {
    return new Collection({
      basePath: 'account/bills?filter_active=true',
      query: {
        sort_due_date: -1
      },
      model: Bill
    })
  },
  data() {
    return {
      amount: null,
      current_model: null,
      modal_visible: false
    }
  },
  methods: {
    fetch() {
      this.$refs.collection.fetch()
    },
    showModal(data) {
      this.amount = typeof data.amount === 'number'
        ? data.amount
        : null
      this.current_model = data.model

      this.modal_visible = true
    },
    closeModal() {
      this.modal_visible = false
      this.current_model = null
    }
  },
  components: {
    row,
    TransferModal,
    Checkmark
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
