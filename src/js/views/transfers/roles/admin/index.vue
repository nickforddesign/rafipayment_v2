<template>
  <div>
    <collection
      name="transfers"
      range="created"
      ref="collection"
      :$collection="$collection">

      <responsive-table slot="content" :columns="[
        {
          name: 'Date',
          sort: 'created'
        },
        {
          name: 'Destination',
          sort: false
        },
        {
          name: 'Source',
          sort: 'source.full_name'
        },
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

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Transfer from '@/models/transfer'

import row from '../../row'

export default {
  name: 'transfers',
  collection() {
    return new Collection({
      basePath() {
        return 'transfers'
      },
      query: {
        sort_created: -1
      },
      model: Transfer
    })
  },
  methods: {
    fetch() {
      this.$collection.fetch()
    }
  },
  components: {
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
