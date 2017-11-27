<template>
  <div>
    <collection name="bills" :$collection="$collection" :searchable="false">

      <responsive-table slot="content" :columns="[
        'Due Date',
        'Target',
        'Type',
        'Balance'
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

    </collection>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Bill from '@/models/bill'

import row from '../../row'

export default {
  name: 'leases',
  collection() {
    return new Collection({
      basePath: 'account/bills',
      model: Bill
    })
  },
  components: {
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
