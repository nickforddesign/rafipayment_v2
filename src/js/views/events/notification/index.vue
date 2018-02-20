<template>
  <div class="collection-view">
    <collection collection_name="notifications" :label="false" :$collection="$collection">
      <responsive-table slot="content" :columns="[
        {
          name: 'Date',
          sort: 'created'
        },
        {
          name: 'Name',
          sort: 'target.full_name'
        },
        'Title',
        {
          name: 'Type',
          sort: 'data.type',
          width: '120px'
        },
        {
          name: ' ',
          sort: false,
          width: '100px'
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
      basePath: `events?&filter_type=notification`,
      query: {
        sort_created: -1
      },
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
