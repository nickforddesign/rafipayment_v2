<template>
  <div>
    <collection collection_name="bills" :label="false" :$collection="$collection" :searchable="false" ref="collection">

      <responsive-table slot="content" :columns="[
        'Due Date',
        'Target',
        'Type',
        'Balance'
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" @showModal="showModal" />
      </responsive-table>

    </collection>

    <transfer-modal :model="current_model" @close="closeModal" v-if="modal_visible" :confirm="fetch" :suggestion="amount" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Bill from '@/models/bill'
import TransferModal from '@/components/modals/bill/transfer'

import row from './row'

export default {
  name: 'bills-current',
  collection() {
    return new Collection({
      basePath: 'account/bills?filter_active=true',
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
    TransferModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
