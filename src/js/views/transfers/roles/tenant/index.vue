<template>
  <div>
    <collection name="transfers" collection_name="transfers" :$collection="$collection" :searchable="false">

      <responsive-table slot="content" :columns="[
        'Date',
        'Destination',
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

      <div slot="empty-message">
        You don't have any transfers yet
      </div>

    </collection>

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Transfer from '@/models/transfer'

import row from './row'

export default {
  name: 'ledger',
  collection() {
    return new Collection({
      basePath: 'account/transfers',
      query: {
        sort_created: -1
      },
      model: Transfer
    })
  },
  components: {
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
</style>

