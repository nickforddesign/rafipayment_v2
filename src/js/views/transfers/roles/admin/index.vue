<template>
  <div>
    <collection name="transfers" collection_name="transfers" :$collection="$collection" :queries="[range_query]" :searchable="false" ref="collection">
    <div slot="header">
      <div class="flexbox">
        <div class="flex">Transfers</div>
        <div class="solid range">
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

    <!-- <transfer-modal v-if="modal_visible" @close="closeModal" :confirm="confirmModal" /> -->
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import { Collection } from 'vue-collections'
import Transfer from '@/models/transfer'
import { getMonthsArray } from '@/utils'

import row from '../../row'
// import transferModal from '@/components/modals/transfer'

export default {
  name: 'ledger',
  data() {
    return {
      // modal_visible: false
      range_fetched: false,
      ranges: null,
      range: null
    }
  },
  collection() {
    return new Collection({
      basePath: 'transfers',
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
        return `range_created=${start},${end}`
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
      const { min, max } = await this.$request('bills/range/created')
      const array = getMonthsArray(min, max)
      array.push('All')
      this.ranges = array
      this.range = moment.utc().startOf('month').format('M/YYYY')
      this.range_fetched = true
    }
    // add() {
    //   this.modal_visible = true
    // },
    // closeModal() {
    //   this.modal_visible = false
    // },
    // confirmModal() {
    //   this.$collection.fetch()
    // }
  },
  components: {
    row
    // transferModal
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
