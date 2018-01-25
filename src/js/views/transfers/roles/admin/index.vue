<template>
  <div v-if="range_fetched">
    <collection name="transfers" :$collection="$collection" :queries="range_query" :searchable="false" ref="collection">
    <div slot="header">
      <div class="flexbox">
        <div class="flex">Transfers</div>
        <div class="solid range" v-if="range">
          <select-menu name="range" v-model="range">
            <option v-for="(range, index) in ranges" :value="range" :key="index">{{ range }}</option>
          </select-menu>
        </div>
      </div>
    </div>
      <div slot="actions">
        <!-- <button @click="add" class="primary">Add Transfer</button> -->
      </div>

      <responsive-table slot="content" :columns="[
        'Date',
        'Destination',
        'Source',
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
import moment from 'moment'
import { Collection } from 'vue-collections'
import Transfer from '@/models/transfer'
import { getMonthsArray } from '@/utils'

import row from '../../row'

export default {
  name: 'ledger',
  data() {
    return {
      range_fetched: false,
      ranges: null,
      range: null
    }
  },
  collection() {
    return new Collection({
      basePath() {
        return 'transfers'
      },
      model: Transfer
    })
  },
  created() {
    this.fetchRange()
  },
  computed: {
    range_query() {
      if (this.range && this.range !== 'All') {
        const arr = this.range.split('/')
        const date_str = [arr[0], '1', arr[1]].join('/')
        const date = moment.utc(date_str, 'M/D/YYYY')
        const start = date.startOf('month').format('YYYY-MM-DD')
        const end = date.endOf('month').format('YYYY-MM-DD')
        return {
          range_created: `${start},${end}`
        }
      }
    }
  },
  methods: {
    fetch() {
      this.$collection.fetch()
    },
    async fetchRange() {
      const { min, max } = await this.$request('transfers/range/created')
      if (min && max) {
        const array = getMonthsArray(min, max)
        array.push('All')
        this.ranges = array
        this.range = moment.utc().startOf('month').format('M/YYYY')
      }
      this.range_fetched = true
    }
  },
  components: {
    row
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
.meta {
  .range {
    margin-left: 10px;
    position: relative;
    top: -2px;
  }
  .select-container {
    display: inline-block;
    padding-top: 2px;
  }
}
</style>
