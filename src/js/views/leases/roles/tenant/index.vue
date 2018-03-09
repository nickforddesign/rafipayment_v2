<template>
  <div>
    <collection name="leases" :$collection="$collection" :searchable="false">
      <responsive-table slot="content" :columns="[
        {
          name: 'Property',
          sort: 'search.property.display_name'
        },
        {
          name: 'Unit',
          sort: 'search.unit.name'
        },
        {
          name: 'Start Date',
          sort: false
        },
        'End Date',
        {
          name: 'Duration',
          class: 'duration-col',
          sort: false
        },
        {
          name: ' ',
          sort: false
        },
        {
          name: 'Current Rent',
          class: 'text-right',
          sort: false
        }
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

      <div slot="empty-message">
        You don't have any leases yet
      </div>

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
      query: {
        sort_created: -1
      },
      model: Lease
    })
  },
  components: {
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style lang="scss">
.duration-col {
  width: 30px;
}
</style>
