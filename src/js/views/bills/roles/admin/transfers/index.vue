<template>
  <div class="table collection-view">
    <div class="header">
      Payments
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
          class: 'text-right' ,
          width: '80px'
        }
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

      <empty v-else>
        <div slot="message">There are no payments on this bill yet</div>
      </empty>
    </div>
    <loading v-else type="table" />
    </div>
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
    model: Object
  },
  data() {
    return {
      fetched: false
    }
  },
  collection() {
    const self = this
    return new Collection({
      basePath() {
        return `transfers?filter_bill=${self.model.id}&paginator_limit=5&sort_created=-1`
      }
    })
  },
  async created() {
    await this.$collection.fetch()
    this.fetched = true
  },
  methods: {
    viewAll() {
      this.$router.push(`/transfers?filter_bill=${this.model.id}`)
    }
  },
  // computed: {
  //   collection() {
  //     return this.model.transfers
  //   }
  // },
  components: {
    row
  }
}
</script>
