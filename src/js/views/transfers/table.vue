<template>
  <div class="table collection-view">
    <div class="header">
      Recent Payments
      <div class="actions">
        <button class="small" @click="viewAll">View all</button>
      </div>
    </div>
    <div v-if="fetched">
      <responsive-table v-if="collection.length" :columns="[
        'Date',
        'Destination',
        'Source',
        'Type',
        'Status',
        {
          name: 'Amount',
          class: 'text-right',
          width: '80px'
        }
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

      <empty v-else>
        <div slot="message">No payments yet</div>
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
  name: 'transfers-table',
  props: {
    data: Object,
    path: String
  },
  data() {
    return {
      fetched: false
    }
  },
  collection() {
    return new Collection({
      basePath: `${this.path}&paginator_limit=5`,
      query: {
        sort_created: -1
      }
    })
  },
  async created() {
    await this.$collection.fetch()
    this.fetched = true
  },
  methods: {
    viewAll() {
      this.$router.push(`/${this.path}`)
    }
  },
  components: {
    row
  }
}
</script>
