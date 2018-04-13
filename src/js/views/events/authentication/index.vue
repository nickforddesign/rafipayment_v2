<template>
  <div class="collection-view">
    <collection collection-name="events" :label="false" :$collection="$collection">
      <responsive-table slot="content" :columns="[
        {
          name: 'Date',
          sort: 'created'
        },
        {
          name: 'Name',
          sort: 'source.full_name'
        },
        {
          name: 'Type',
          sort: 'data.type'
        },
        {
          name: 'IP',
          sort: 'source.ip_address'
        },
        {
          name: 'Client',
          sort: 'source.rafipayment_client'
        },
        {
          name: ' ',
          sort: false,
          width: '60px'
        },
        'Success'
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

    </collection>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'
import Event from '@/models/event'

import row from './row'

export default {
  name: 'properties',
  data() {
    return {
      modal_visible: false
    }
  },
  collection() {
    return new Collection({
      basePath: `events?sort_created=-1&filter_type=authentication`,
      model: Event
    })
  },
  methods: {
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
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
