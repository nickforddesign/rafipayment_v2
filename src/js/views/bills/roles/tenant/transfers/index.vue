<template>
  <div class="table collection-view">
    <div class="header">
      Payments
    </div>
    <div v-if="model.has_transfers">
      <div v-if="model.transfers.length">

        <responsive-table :columns="[
          'Date',
          'Source',
          'Type',
          'Status',
          {
            name: 'Amount',
            width: '80px',
            class: 'text-right'
          }
        ]">
          <row v-for="(model, index) in collection" :key="index" :model="model" />
        </responsive-table>

      </div>
      <loading v-else type="table" />
    </div>
    <empty v-else>
      <div slot="message">There are no payments on this bill yet</div>
      <button class="primary" slot="actions" @click="$parent.showModal">Make a Payment</button>
    </empty>
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
        return `account/transfers?filter_bill=${self.model.id}&sort_created=-1`
      }
    })
  },
  async created() {
    await this.$collection.fetch()
    this.fetched = true
  },
  components: {
    row
  }
}
</script>
