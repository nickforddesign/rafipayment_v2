<template>
  <div class="tr" @click.exact="goToModel" @click.ctrl="goToModelNew" @click.meta="goToModelNew">
    <cell>
      <router-link :to="`/${$bill.url}`">{{ $bill.due_date | moment('M/D/YY', true) }}</router-link>
    </cell>
    <cell>{{ $bill.target }}</cell>
    <cell>{{ $bill.type }}</cell>
    <cell>
      <indicator
        v-if="$bill.type === 'manual'"
        :status="[$bill.statusClass($bill.getStatus())]">
        {{ $bill.getStatus() | capitalize | replace }}
      </indicator>
      <indicator
        v-else
        v-for="(tenant, index) in $bill.tenants"
        :key="index"
        :status="[$bill.statusClass($bill.getStatus(tenant.id))]">
        <div class="strong">
          {{ tenant.full_name }}
        </div>
        <div>
          {{ $bill.getStatus(tenant.id) | capitalize | replace }}
        </div>
      </indicator>
      
    </cell>
    <cell class="text-right">{{ $bill.balance | currency }}</cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Bill from '@/models/bill'
import { smartClick } from '@/utils'
import Indicator from '@/components/indicator'

export default {
  name: 'row',
  props: ['model'],
  models: {
    bill() {
      return new Bill(this.model)
    }
  },
  methods: {
    goToModel(e) {
      smartClick(e, () => this.$router.push(`/${this.$bill.urlRoot}`))
    },
    goToModelNew(e) {
      smartClick(e, () => window.open(`/${this.$bill.urlRoot}`))
    }
  },
  components: {
    Indicator
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
