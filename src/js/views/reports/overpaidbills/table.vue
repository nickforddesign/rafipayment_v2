<template>
  <div class="table collection-view">
    <div class="header">
      <div class="meta">
        <slot name="title">
          Overpaid Bills <span v-if="fetched">({{ collection.length }})</span>
        </slot>
      </div>
      <div class="actions">
        <slot name="actions">
          <button class="small" @click="viewAll">View All</button>
        </slot>
      </div>
    </div>

    <div v-if="fetched">
      <responsive-table v-if="collection.length" :columns="[
        'Due Date',
        'Target',
        'Type',
        {
          name: 'Balance',
          class: 'text-right'
        }
      ]">
        <row v-for="(model, index) in collection" :key="index" :model="model" />
      </responsive-table>

      <empty v-else>
        <div slot="message">No overpaid bills</div>
      </empty>
    </div>
    <loading v-else type="table" />

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import { Collection } from 'vue-collections'
import { getMonthsArray } from '@/utils'
import Bill from '@/models/bill'

import row from '@/views/bills/row'

export default {
  name: 'unpaid-bills-table',
  data() {
    return {
      fetched: false,
      range: ''
    }
  },
  collection() {
    return new Collection({
      basePath: '/bills',
      query: {
        sort_due_date: -1,
        filter_active: true
      }
    })
  },
  created() {
    this.fetch()
  },
  computed: {
    range_query() {
      const arr = this.range.split('/')
      const date_str = [arr[0], '1', arr[1]].join('/')
      const date = moment.utc(date_str, 'M/D/YYYY')
      const start = date.startOf('month').format('YYYY-MM-DD')
      const end = date.endOf('month').format('YYYY-MM-DD')
      return {
        range_due_date: `${start},${end}`
      }
    }
  },
  methods: {
    viewAll() {
      this.$router.push('/bills')
    },
    async fetch() {
      await this.fetchRange()
      await this.$collection.fetch()
      this.$collection.models = this.collection.filter(data => {
        const bill = new Bill(data)
        return bill.balance < 0
      })
      this.fetched = true
    },
    async fetchRange() {
      const { min, max } = await this.$request(
        `${this.$collection.$basePath}/range/due_date`
      )
      if (min && max) {
        const months_array = getMonthsArray(min, max)
        this.range = months_array[months_array.length - 1]
        this.updateRange()
      }
    },
    updateRange() {
      this.$collection.query_push(this.range_query)
    }
  },
  components: {
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.collection-view {
  padding: 0;
}
</style>
