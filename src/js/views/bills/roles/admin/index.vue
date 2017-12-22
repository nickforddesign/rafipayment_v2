<template>
  <div>
    <collection name="bills" :$collection="$collection">
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
import row from '../../row'

const now = moment.utc()
const start = now.startOf('month').format('YYYY-MM-DD')
const end = now.endOf('month').format('YYYY-MM-DD')

export default {
  name: 'leases',
  data() {
    return {
      modal_visible: false,
      ranges: [
        '12/2017',
        'all'
      ],
      range: '12/2017'
    }
  },
  collection() {
    return new Collection({
      basePath() {
        return `bills?sort_created=-1&range_due_date=${start},${end}`
      },
      model: Bill
    })
  },
  watch: {
    range(val) {
      if (val !== 'all') {
        const arr = val.split('/')
        const date_str = [arr[1], arr[0], '1'].join('-')
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
      this.$collection.reset()
      this.$collection.fetch()
    }
  },
  methods: {
    fetch() {
      this.$collection.fetch()
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
  }
  .select-container {
    display: inline-block;
    // max-width: 120px !important;
    // select {
      // padding-right: 60px;
    // }
    // max-width: auto !important;
  }
}
</style>
