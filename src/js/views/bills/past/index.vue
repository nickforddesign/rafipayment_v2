<template>
  <div>
    <collection
      collection-name="past bills"
      :$collection="$collection"
      :searchable="false"
      :paginate="false">

      <responsive-table slot="content" :columns="[
        'Due Date',
        {
          name: 'Target',
          sort: 'search.property.display_name'
        },
        'Type',
        {
          name: 'Balance',
          class: 'text-right',
          sort: false
        }
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
        
      </responsive-table>

      <div slot="empty-message">
        You don't have any past bills
      </div>

    </collection>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Bill from '@/models/bill'

import row from './row'

export default {
  name: 'bills-past',
  collection() {
    return new Collection({
      basePath: 'account/bills?filter_active=false',
      query: {
        sort_due_date: -1
      },
      model: Bill
    })
  },
  components: {
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
