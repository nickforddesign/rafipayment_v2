<template>
  <div class="table collection-view">
    <div class="header">
      Authentication Events
      <div class="actions">
        <button class="small" @click="viewAll">View All</button>
      </div>
    </div>
    <div v-if="fetched" class="grid">
      <div v-if="collection.length" class="grid__col grid__col--4-of-12">
        <chart :url="`events?filter_type=authentication&filter_parties=${user.id}`" />
        <!-- <div id="chart" /> -->
      </div>
      <div v-if="collection.length" class="grid__col grid__col--8-of-12">
        <responsive-table :columns="[
          'Date',
          'Type',
          'Client',
          ' ',
          'Success'
        ]">
          <row v-for="(model, index) in collection" :key="index" :model="model" />
        </responsive-table>
      </div>
      <empty v-else>
        <div slot="message">This {{ $parent.$options.name }} doesn't have any authentication events yet</div>
      </empty>
    </div>
    <loading v-else type="table" />
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
// import G2 from '@antv/g2'
// import { DataView } from '@antv/data-set'
import { Collection } from 'vue-collections'
import Chart from '../chart'

import row from './row'

export default {
  name: 'auth-events-table',
  props: {
    user: Object
  },
  data() {
    return {
      fetched: false
      // all_fetched: false,
      // all_events: null
    }
  },
  collection() {
    return new Collection({
      basePath: `events?filter_parties=${this.user.id}&filter_type=authentication&paginator_limit=5&sort_created=-1`
    })
  },
  async created() {
    await this.$collection.fetch()
    // this.fetchAll()
    this.fetched = true
  },
  // computed: {
  //   events_data() {
  //     const dict = {}
  //     this.all_events.map(event => {
  //       const client = event.source.rafipayment_client.split('/')[0]
  //       const device = event.source.user_agent.device_family
  //       const key = `${client} - ${device}`
  //       if (!dict[key]) {
  //         dict[key] = 1
  //       } else {
  //         dict[key]++
  //       }
  //     })
  //     return Object.keys(dict).map(key => {
  //       return {
  //         item: key,
  //         count: dict[key]
  //       }
  //     }).sort((a, b) => {
  //       return a.item < b.item ? -1 : 1
  //     })
  //   }
  // },
  methods: {
    viewAll() {
      this.$router.push(`/events/authentication?filter_parties=${this.user.id}`)
    }
    // renderChart() {
    //   G2.Global.setTheme('dark')
    //   const dv = new DataView()
    //   dv.source(this.events_data).transform({
    //     type: 'percent',
    //     field: 'count',
    //     dimension: 'item',
    //     as: 'percent'
    //   })
    //   const chart = new G2.Chart({
    //     container: 'chart',
    //     forceFit: true,
    //     // height: window.innerHeight,
    //     height: 400,
    //     animate: true,
    //     background: {
    //       fill: 'transparent'
    //     },
    //     plotBackground: {
    //       fill: 'transparent'
    //       // stroke: 'red'
    //     }
    //   })
    //   chart.source(dv, {
    //     percent: {
    //       formatter: val => {
    //         val = (val * 100).toFixed(1) + '%'
    //         return val
    //       }
    //     }
    //   })
    //   chart.coord('theta', {
    //     radius: 0.75,
    //     innerRadius: 0.6
    //   })
    //   chart.tooltip({
    //     showTitle: false,
    //     itemTpl: '<li><span style="background-color:{color}" class="g2-tooltip-marker"></span>{name}: {percent} - {count}</li>'
    //   })
    //   chart.guide().html({
    //     position: [ '50%', '50%' ],
    //     html: `<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em"><br><span style="color:#8c8c8c;font-size:20px">${this.all_events.length}</span></div>`,
    //     alignX: 'middle',
    //     alignY: 'middle'
    //   })
    //   chart.intervalStack()
    //     .position('percent')
    //     .color('item')
    //     .label('percent', {
    //       formatter: (val, item) => {
    //         const arr = item.point.item.split(' - ')
    //         const first = arr[0]
    //         const second = arr[1]
    //         return `${first}\n${second}\n${val}`
    //       }
    //     })
    //     .tooltip('item*percent', (item, percent) => {
    //       const count = this.events_data.find(event => event.item === item).count
    //       percent = (percent * 100).toFixed(1) + '%'
    //       return {
    //         name: item,
    //         percent,
    //         count
    //       }
    //     })
    //     .style({
    //       lineWidth: 1,
    //       stroke: '#666'
    //     })
    //   chart.render()
    //   // interval.setSelected(dv.rows[0])
    // }
  },
  components: {
    row,
    Chart
  }
}
</script>
