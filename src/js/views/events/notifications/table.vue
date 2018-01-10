<template>
  <div class="table collection-view">
    <div class="header">
      Notifications
      <div class="actions">
        <button class="small" @click="viewAll">View All</button>
      </div>
    </div>
    <div v-if="fetched">
      <div v-if="collection.length">
        <responsive-table :columns="[
          'Date',
          'Type',
          'Title',
          'Success'
        ]">
          <row v-for="(model, index) in collection" :key="index" :model="model" />
        </responsive-table>
      </div>
      <empty v-else>
        <div slot="message">This {{ $parent.$options.name }} doesn't have any notitcations yet</div>
      </empty>
    </div>
    <loading v-else type="table" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { Collection } from 'vue-collections'

import row from './row'

export default {
  name: 'notifications-table',
  props: {
    user: Object
  },
  data() {
    return {
      fetched: false
    }
  },
  collection() {
    return new Collection({
      basePath: `events?filter_parties=${this.user.id}&filter_type=notification&paginator_limit=5`
    })
  },
  async created() {
    await this.$collection.fetch()
    this.fetched = true
  },
  methods: {
    viewAll() {
      this.$router.push(`/notifications?filter_parties=${this.user.id}`)
    }
  },
  components: {
    row
  }
}
</script>
