<template>
  <div class="tr" @click.exact="goToModel" @click.ctrl="goToModelNew" @click.meta="goToModelNew">
    <cell>
      <router-link :to="`/${$lease.urlRoot}`">
        {{ $lease.property.address }}
      </router-link>
    </cell>
    <cell>{{ $lease.unit.name }}</cell>
    <cell>{{ $lease.start_date | moment('M/D/YY', true) }}</cell>
    <cell>{{ $lease.end_date | moment('M/D/YY', true) }}</cell>
    <cell>{{ lease_length }}</cell>
    <cell>
      <tenant v-for="(tenant, index) in $lease.tenants" :key="index" :tenant="tenant" />
    </cell>
    <cell class="text-right">{{ current_rent }}</cell>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import { prettyCurrency, smartClick } from '@/utils'
import Lease from '@/models/lease'
import Tenant from './tenant'

export default {
  name: 'row',
  props: ['model'],
  data() {
    return {
      is_down: false,
      has_moved: false
    }
  },
  models: {
    lease() {
      return new Lease(this.model)
    }
  },
  computed: {
    current_rent() {
      return this.$lease.is_active
        ? prettyCurrency(this.$lease.periods_sorted[this.$lease.current_period].amount)
        : '–'
    },
    lease_length() {
      return this.$lease.length.months
        ? `${this.$lease.length.months} Mo.`
        : 'N/A'
    }
  },
  methods: {
    goToModel(e) {
      smartClick(e, () => this.$router.push(`/${this.$lease.urlRoot}`))
    },
    goToModelNew(e) {
      smartClick(e, () => window.open(`/${this.$lease.urlRoot}`))
    }
  },
  components: {
    Tenant
  }
}
</script>

<!--/////////////////////////////////////////////////////////////////////////-->
