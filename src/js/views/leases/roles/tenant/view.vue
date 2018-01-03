<template>
  <div class="model-view">
    <div v-if="fetched">
      <header>
        <div class="meta">
          <legend>Lease</legend>
          <h2>{{ $lease.address }}</h2>
        </div>
      </header>

      <div class="table-container">
        <div class="header">
          Basic Information
        </div>
        <div class="grid">
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Start Date</dt>
              <dd>{{ $lease.start_date | moment('M/DD/YY', true) }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>End Date</dt>
              <dd>{{ $lease.end_date | moment('M/DD/YY', true) }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Duration</dt>
              <dd>{{ $lease.length.auto }}</dd>
            </dl>
          </div>
        </div>
      </div>

      <!-- <div class="table-container" v-if="$lease.periods.length < 1"> -->
      <div class="table-container">
        <div class="header">
          Billing Periods
        </div>

        <responsive-table :columns="[
          'Start Date',
          'End Date',
          'Amount',
          'Your Split',
          {
            name: 'Actions',
            class: 'text-right',
            label: false
          }
        ]">
          <split-row v-for="(period, index) in my_periods" :lease="$lease" :period="period" :key="index" :index="index" />
        </responsive-table>

      </div>

      <div class="table-container">
        <div class="header">
          Unit Information
        </div>
        <div class="grid">
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Unit Name</dt>
              <dd>{{ $lease.unit.name }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Property</dt>
              <dd>{{ $lease.property.name }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Beds</dt>
              <dd>{{ $lease.unit.bed_count }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Beds</dt>
              <dd>{{ $lease.unit.bed_count }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
            <dl>
              <dt>Square Footage</dt>
              <dd>{{ $lease.unit.square_footage }}</dd>
            </dl>
          </div>
          <div class="grid__col grid__col--1-of-2">
          </div>
        </div>
      </div>
      <tenants-table :data="$lease.tenants" />
      <!-- <pre>{{ $lease }}</pre> -->
    </div>
  </div>
</template>

<!--/////////////////////////////////////////////////////////////////////////-->

<script>
import session from '@/session'
import Lease from '@/models/lease'
import tenantsTable from '@/views/tenants/table'
import splitRow from './split_row'
import { mergeDeepRight } from 'ramda'

export default {
  name: 'lease',
  data() {
    return {
      fetched: false
    }
  },
  models: {
    lease() {
      return new Lease({
        id: this.$route.params.id
      }, {
        basePath: 'account/leases'
      })
    }
  },
  computed: {
    my_periods() {
      const my_periods = this.$lease.tenants.find(tenant => {
        return tenant.id === session.$user.id
      }).periods

      const periods = this.$lease.periods.map(lease_period => {
        lease_period.period_amount = lease_period.amount
        const match = my_periods.find(period => {
          return period.id === lease_period.id
        }) || {}
        return mergeDeepRight(lease_period, match)
      })
      return periods
    }
  },
  async created() {
    await this.fetch()
    this.fetched = true
  },
  methods: {
    async fetch() {
      return this.$lease.fetch()
    },
    async remove() {
      const confirmed = confirm(`Are you sure you want to remove ${this.$lease.address}?`)
      if (confirmed) {
        await this.$lease.destroy()
        this.$router.push('/leases')
      }
    }
  },
  components: {
    tenantsTable,
    splitRow
  }
}
</script>
