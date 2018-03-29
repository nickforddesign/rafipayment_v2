<template>
  <div class="authentication-chart">
    <div class="chart" v-if="fetched" />
    <loading v-else type="table" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import G2 from '@antv/g2'
import { DataView } from '@antv/data-set'
import { Collection } from 'vue-collections'

G2.track(false)

export default {
  name: 'authentication-chart',
  props: {
    url: String
  },
  data() {
    return {
      fetched: false
    }
  },
  collection() {
    return new Collection({
      basePath: this.url
    })
  },
  created() {
    this.fetch()
  },
  computed: {
    events_data() {
      const dict = {}
      this.collection.map(event => {
        const rafipayment_client = event.source.rafipayment_client || ''
        const client = rafipayment_client.split('/')[0]
        let OS = event.source.user_agent.os_family || ''
        if (OS.includes('Windows')) {
          OS = OS.split(' ')[0]
        }
        // const device = OS === 'Android'
        //   ? 'Android'
        //   : event.source.user_agent.device_family
        const key = client === 'Web'
          ? `${client} - ${OS}`
          : OS
        // const key = `${client} - ${OS}`
        if (!dict[key]) {
          dict[key] = 1
        } else {
          dict[key]++
        }
      })
      return Object.keys(dict).map(key => {
        return {
          item: key,
          count: dict[key]
        }
      }).sort((a, b) => {
        return a.item < b.item ? -1 : 1
      })
    }
  },
  methods: {
    async fetch() {
      this.fetched = false
      await this.$collection.fetch()
      this.fetched = true
      await this.$nextTick()
      this.renderChart()
    },
    renderChart() {
      G2.Global.setTheme('dark')
      const dv = new DataView()
      dv.source(this.events_data).transform({
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
        html: `<div style="color:#8c8c8c;font-size: 20px;text-align: center;width: 10em">${this.collection.length}</div>`,
        alignX: 'middle',
        alignY: 'middle'
      })
      chart.intervalStack()
        .position('percent')
        .color('item')
        .label('percent', {
          formatter: (val, item) => {
            // const arr = item.point.item.split(' - ')
            // const first = arr[0]
            // const second = arr[1]
            // return `${first}\n${second}\n${val}`
            return `${item.point.item}\n${val}`
          }
        })
        .tooltip('item*percent', (item, percent) => {
          const count = this.events_data.find(event => event.item === item).count
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
