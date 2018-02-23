<template>
  <div class="box">
    <pre>{{ months }}</pre>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import { set, view, compose, lensProp } from 'ramda'
import { Collection } from 'vue-collections'
import Bill from '@/models/bill'
// import data from './data'

export default {
  name: 'report-income',
  data() {
    return {
      months: {}
    }
  },
  collection() {
    return new Collection({
      basePath: 'bills',
      query: {
        paginator_limit: 200
      },
      model: Bill
    })
    // return new Collection({
    //   model: Bill
    // }, data)
  },
  async mounted() {
    await this.fetch()
    // console.log(this.collection)
    this.collection.map(data => {
      const bill = new Bill(data)
      const month_year = moment.utc(bill.due_date).format('M/YYYY')
      const month_year_lens = lensProp(month_year)
      const expected_lens = lensProp('expected')
      const received_lens = lensProp('received')

      const expected = view(compose(month_year_lens, expected_lens), this.months) || 0
      const received = view(compose(month_year_lens, received_lens), this.months) || 0
      this.months = set(compose(month_year_lens, expected_lens), expected + bill.total, this.months)
      this.months = set(compose(month_year_lens, received_lens), received + bill.total - bill.balance, this.months)
      console.log(this.months)
    })
  },
  methods: {
    fetch() {
      return this.$collection.fetch()
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
