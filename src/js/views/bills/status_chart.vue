<template>
  <div class="status-chart">
    <div class="chart" v-if="fetched" />
    <loading v-else type="table" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import moment from 'moment'
import G2 from '@antv/g2'
import { DataView } from '@antv/data-set'
import { Collection } from 'vue-collections'
import Bill from '@/models/bill'
import { getMonthsArray } from '@/utils'

export default {
  name: 'status-chart',
  // props: {
  //   url: String
  // },
  data() {
    return {
      fetched: false,
      graph_data: null,
      range: ''
    }
  },
  collection() {
    return new Collection({
      basePath: 'bills'
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
    async fetch() {
      this.fetched = false
      await this.fetchRange()
      await this.$collection.fetch()
      this.setData()
      this.fetched = true
      await this.$nextTick()
      this.renderChart()
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
    },
    setData() {
      const dict = {
        paid: 0,
        partial: 0,
        unpaid: 0
      }
      this.$collection.models.map(data => {
        const bill = new Bill(data)
        if (bill.balance <= 0) {
          dict.paid++
        } else {
          if (bill.transfers.length) {
            dict.partial++
          } else {
            dict.unpaid++
          }
        }
      })
      this.graph_data = Object.keys(dict).map(key => {
        return {
          item: key,
          count: dict[key]
        }
      })
    },
    renderChart() {
      G2.Global.setTheme('dark')
      G2.track(false)
      const dv = new DataView()
      dv.source(this.graph_data).transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      const chart = new G2.Chart({
        container: this.$el.querySelector('.chart'),
        forceFit: true,
        // height: window.innerHeight,
        height: 400,
        animate: true,
        background: {
          fill: 'transparent'
        },
        plotBackground: {
          fill: 'transparent'
          // stroke: 'red'
        }
      })
      chart.source(dv, {
        percent: {
          formatter: val => {
            val = (val * 100).toFixed(1) + '%'
            return val
          }
        }
      })
      chart.coord('theta', {
        radius: 0.75,
        innerRadius: 0.6
      })
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color}" class="g2-tooltip-marker"></span>{name}: {percent} - {count}</li>'
      })
      chart.guide().html({
        position: [ '50%', '50%' ],
        html: `<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em"><br><span style="color:#8c8c8c;font-size:20px">${this.collection.length}</span></div>`,
        alignX: 'middle',
        alignY: 'middle'
      })
      chart.intervalStack()
        .position('percent')
        .color('item', ['#0ca449', '#1c80dd', '#da1752'])
        .label('percent', {
          formatter: (val, item) => {
            return `${item.point.item}\n${val}`
          }
        })
        .tooltip('item*percent', (item, percent) => {
          const count = this.graph_data.find(event => event.item === item).count
          percent = (percent * 100).toFixed(1) + '%'
          return {
            name: item,
            percent,
            count
          }
        })
        .style({
          lineWidth: 1,
          stroke: '#666'
        })
      chart.render()
      // interval.setSelected(dv.rows[0])
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">

</style>
