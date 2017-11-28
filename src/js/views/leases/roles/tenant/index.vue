<template>
  <div>
    <collection name="leases" :$collection="$collection" :searchable="false">
      <responsive-table slot="content" :columns="[
        'Property',
        'Unit',
        'Start Date',
        'End Date',
        'Duration',
        'Current Rent'
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

    </collection>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Lease from '@/models/lease'

import row from '../../row'

export default {
  name: 'leases',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: 'account/leases',
      model: Lease
    })
  },
  components: {
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
