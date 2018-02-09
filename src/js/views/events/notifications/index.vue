<template>
  <div class="collection-view">
    <collection name="Notifications" :$collection="$collection">
      <responsive-table slot="content" :columns="[
        'Date',
        'Type',
        'Title',
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
