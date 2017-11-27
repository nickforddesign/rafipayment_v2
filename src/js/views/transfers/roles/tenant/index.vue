<template>
  <div>
    <collection name="ledger" collection_name="transfers" :$collection="$collection">

      <responsive-table slot="content" :columns="[
        'Date',
        'Destination',
        'Source',
        'Type',
        'Status',
        {
          name: 'Amount',
          class: 'text-right' ,
          width: '80px'
        }
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

    </collection>

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Transfer from '@/models/transfer'

import row from '../../row'
// import transferModal from '@/components/modals/transfer'

export default {
  name: 'ledger',
  // data() {
  //   return {
  //     modal_visible: false
  //   }
  // },
  collection() {
    return new Collection({
      basePath: 'account/transfers',
      model: Transfer
    })
  },
  // methods: {
  //   async fetch() {
  //     this.fetched = false
  //     this.$collection.reset()
  //     await this.$collection.fetch()
  //     this.fetched = true
  //   },
  //   add() {
  //     this.modal_visible = true
  //   },
  //   closeModal() {
  //     this.modal_visible = false
  //   },
  //   confirmModal() {
  //     this.fetch()
  //   }
  // },
  components: {
    row
    // transferModal
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
</style>

