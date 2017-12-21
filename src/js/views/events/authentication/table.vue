<template>
  <div class="table collection-view">
    <div class="header">
      Authentication Events
      <div class="actions">
        <button class="small" @click="viewAll">View All</button>
      </div>
    </div>
    <div v-if="fetched">
      <div v-if="collection.length">
        <responsive-table :columns="[
          'Date',
          'Type',
          'Client',
          'IP',
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
  name: 'auth-events-table',
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
      basePath: `events?filter_parties=${this.user.id}&filter_type=authentication&paginator_limit=5&sort_created=-1`
    })
  },
  async created() {
    await this.$collection.fetch()
    this.fetched = true
  },
  methods: {
    viewAll() {
      this.$router.push(`/authentication?filter_parties=${this.user.id}`)
    }
  },
  components: {
    row
  }
}
</script>
