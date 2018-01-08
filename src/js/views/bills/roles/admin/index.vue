<template>
  <div v-if="range_fetched">
    <collection name="bills" :$collection="$collection" ref="collection">
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

const now = moment.utc()
const start_moment = now.startOf('month')
const start_date = start_moment.format('YYYY-MM-DD')
const end_date = now.endOf('month').format('YYYY-MM-DD')

export default {
  name: 'leases',
  data() {
    return {
      modal_visible: false,
      range_fetched: false,
      ranges: null,
      range: start_moment.format('MM/YYYY')
    }
  },
  collection() {
    return new Collection({
      basePath() {
        return `bills?sort_created=-1&range_due_date=${start_date},${end_date}`
      },
      model: Bill
    })
  },
  created() {
    this.fetchRange()
  },
  watch: {
    async range(val) {
      if (val !== 'All') {
        const arr = val.split('/')
        const date_str = [arr[0], '1', arr[1]].join('/')
        const date = moment.utc(date_str)
        const start = date.startOf('month').format('YYYY-MM-DD')
        const end = date.endOf('month').format('YYYY-MM-DD')

        this.$collection.basePath = () => {
          return `bills?sort_created=-1&range_due_date=${start},${end}`
        }
      } else {
        this.$collection.basePath = () => {
          return `bills?sort_created=-1`
        }
      }
      this.$refs.collection.fetched = false
      this.$collection.reset()
      await this.$collection.fetch()
      this.$refs.collection.fetched = true
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
  }
}
</style>
