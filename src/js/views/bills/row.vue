<template>
  <div class="tr" @click.exact="goToModel" @click.ctrl="goToModel" @click.meta="goToModelNew">
    <cell>
      <router-link :to="`/${$bill.url}`">{{ $bill.due_date | moment('M/D/YY', true) }}</router-link>
    </cell>
    <cell>{{ $bill.target }}</cell>
    <cell>{{ $bill.type }}</cell>
    <cell>
      <indicator
        v-if="$bill.type === 'automatic'"
        v-for="(tenant, index) in $bill.tenants"
        :key="index"
        :status="[$bill.statusClass($bill.getTenantStatus(tenant.id))]">
        {{ tenant.full_name }} – {{ $bill.getTenantStatus(tenant.id) | capitalize | replace }}
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
