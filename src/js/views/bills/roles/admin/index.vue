<template>
  <div v-if="range_fetched">
    <collection name="bills" :$collection="$collection" ref="collection" :queries="[range_query]">
      <div slot="header">
        <div class="flexbox">
          <div class="flex">Bills</div>
          <div class="solid range">
            <select-menu name="range" v-model="range">
              <option v-for="(range, index) in ranges" :value="range" :key="index">{{ range }}</option>
            </select-menu>
          </div>
        </div>
      </div>
      <div slot="actions">
        <button @click="add" class="primary">Add Bill</button>
      </div>

      <responsive-table slot="content" :columns="[
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

    </collection>

    <bill-modal v-if="modal_visible" @close="closeModal" :confirm="fetch" />

  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import { Collection } from 'vue-collections'
import Bill from '@/models/bill'

import BillModal from '@/components/modals/bill'
import { getMonthsArray } from '@/utils'
import row from '../../row'

// const now = moment.utc()
// const start_moment = now.startOf('month')
// const start_date = start_moment.format('YYYY-MM-DD')
// const end_date = now.endOf('month').format('YYYY-MM-DD')

export default {
  name: 'leases',
  data() {
    return {
      modal_visible: false,
      range_fetched: false,
      ranges: null,
      range: null
      // range: start_moment.format('M/D/YYYY')
    }
  },
  collection() {
    return new Collection({
      basePath() {
        return `bills?sort_created=-1`
      },
      model: Bill
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
        console.log(date_str)
        console.log(moment.utc(date_str))
        const date = moment.utc()
        // const date = moment.utc(date_str)
        const start = date.startOf('month').format('YYYY-MM-DD')
        const end = date.endOf('month').format('YYYY-MM-DD')
        return `range_due_date=${start},${end}`
      }
    }
  },
  watch: {
    async range(val) {
      this.$nextTick(async () => {
        this.$refs.collection.fetched = false
        this.$collection.reset()
        await this.$collection.fetch()
        this.$refs.collection.fetched = true
      })
    }
  },
  methods: {
    fetch() {
      this.$collection.fetch()
    },
    async fetchRange() {
      const { min, max } = await this.$request('bills/range/due_date')
      const array = getMonthsArray(min, max)
      array.push('All')
      this.ranges = array
      this.range = moment.utc().startOf('month').format('M/YYYY')
      this.range_fetched = true
    },
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
    row,
    BillModal
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
