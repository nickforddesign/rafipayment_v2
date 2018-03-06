<template>
  <div class="tr" @click.exact="goToModel" @click.ctrl="goToModel" @click.meta="goToModelNew">
    <cell>
      <router-link :to="`/${$bill.url}`">{{ $bill.due_date | moment('M/D/YY', true) }}</router-link>
    </cell>
    <cell>{{ $bill.target }}</cell>
    <cell>{{ $bill.type }}</cell>
    <cell>
      <span class="tenant" v-for="(tenant, index) in $bill.tenants" :key="index" v-if="$bill.type === 'automatic'">
        <span v-if="tenantHasCharges(tenant)">
          <div class="indicator" :class="{ paid: tenantHasPaid(tenant) }" />
        </span>
      </span>
    </cell>
    <cell class="text-right">{{ $bill.balance | currency }}</cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import Bill from '@/models/bill'
import { smartClick } from '@/utils'

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
    },
    tenantHasCharges(tenant) {
      return (tenant.charges.reduce((acc, item) => acc + item.amount * 100, 0) / 100) > 0
    },
    tenantHasPaid(tenant) {
      return !!this.$bill.transfers.find(transfer => transfer.source.id === tenant.id)
    }
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->

<style scoped lang="scss">
@import '~%/colors';

$indicator-size: 10px;

.indicator {
  display: inline-block;
  height: $indicator-size;
  width: $indicator-size;
  background: transparent;
  border-radius: 100%;
  margin-right: $indicator-size / 2;
  border: 1px solid $color-status-success;

  &.paid {
    background: $color-status-success;
  }
}
</style>