<template>
  <div>
    <collection
      name="bills"
      ref="collection"
      range="due_date"
      :$collection="$collection"
      :searchable="false">

      <div slot="actions">
        <button @click="add" class="primary">Add Bill</button>
      </div>

      <responsive-table slot="content" :columns="[
        'Due Date',
        'Target',
        'Type',
        {
          name: 'Balance',
          class: 'text-right'
        }
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

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
      modal_visible: false,
      range_fetched: false,
      ranges: null,
      range: null
    }
  },
  collection() {
    return new Collection({
      basePath: 'bills',
      query: {
        sort_created: -1
      },
      model: Bill
    })
  },
  methods: {
    fetch() {
      console.log('parent fetch')
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

